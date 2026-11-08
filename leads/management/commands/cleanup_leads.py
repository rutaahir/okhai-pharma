import os
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.conf import settings
from leads.models import Lead, LeadFile, LeadVoiceNote, LeadAccessLog

class Command(BaseCommand):
    help = 'Cleans up orphaned temporary media files and archives old leads beyond retention period'

    def add_arguments(self, parser):
        parser.add_argument(
            '--retention-days',
            type=int,
            default=180,
            help='Retention days for archived leads and access logs (default: 180)'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Simulate cleanup without deleting any files or records'
        )

    def handle(self, *args, **options):
        retention_days = options['retention_days']
        dry_run = options['dry_run']
        cutoff = timezone.now() - timedelta(days=retention_days)

        self.stdout.write(f"Running Lead cleanup (Retention cutoff: {cutoff})...")

        # 1. Clean old access logs
        old_logs = LeadAccessLog.objects.filter(created_at__lt=cutoff)
        log_count = old_logs.count()
        if not dry_run:
            old_logs.delete()
        self.stdout.write(self.style.SUCCESS(f"Cleaned {log_count} expired access logs."))

        # 2. Check for orphaned files in media directory
        media_root = settings.LEAD_MEDIA_ROOT
        orphaned_files = 0
        if os.path.exists(media_root):
            valid_paths = set()
            for f in LeadFile.objects.all():
                if f.file:
                    valid_paths.add(os.path.abspath(f.file.path))
                if f.preprocessed_image:
                    valid_paths.add(os.path.abspath(f.preprocessed_image.path))
            for v in LeadVoiceNote.objects.all():
                if v.audio_file:
                    valid_paths.add(os.path.abspath(v.audio_file.path))

            for root, dirs, files in os.walk(media_root):
                for filename in files:
                    filepath = os.path.abspath(os.path.join(root, filename))
                    if filepath not in valid_paths:
                        orphaned_files += 1
                        if not dry_run:
                            try:
                                os.remove(filepath)
                            except Exception as e:
                                self.stderr.write(f"Could not remove {filepath}: {e}")

        self.stdout.write(self.style.SUCCESS(f"Orphaned files removed: {orphaned_files}"))

