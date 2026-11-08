from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from leads.models import LeadAccessPasscode

class Command(BaseCommand):
    help = 'Seeds or updates a Lead Access Passcode (hashed securely via Django make_password)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--passcode',
            type=str,
            help='Passcode string (e.g. 6-digit numeric or alphanumeric PIN)',
            required=False
        )
        parser.add_argument(
            '--label',
            type=str,
            default='Primary Commercial Desk Passcode',
            help='Descriptive label for this passcode'
        )
        parser.add_argument(
            '--rotate',
            action='store_true',
            help='Deactivates all previous active passcodes when creating this new one'
        )
        parser.add_argument(
            '--max-uses',
            type=int,
            default=None,
            help='Maximum number of times this passcode can be used'
        )

    def handle(self, *args, **options):
        passcode = options.get('passcode')
        if not passcode:
            import getpass
            passcode = getpass.getpass('Enter new lead passcode: ')
            if not passcode:
                self.stderr.write(self.style.ERROR('Passcode cannot be empty.'))
                return

        label = options['label']
        rotate = options['rotate']
        max_uses = options['max_uses']

        if rotate:
            deactivated_count = LeadAccessPasscode.objects.filter(is_active=True).update(is_active=False)
            self.stdout.write(self.style.WARNING(f"Deactivated {deactivated_count} prior active passcode(s)."))

        # Create new passcode using make_password
        hashed = make_password(passcode)
        entry = LeadAccessPasscode.objects.create(
            label=label,
            passcode_hash=hashed,
            is_active=True,
            max_uses=max_uses,
            created_by='CLI'
        )

        self.stdout.write(self.style.SUCCESS(
            f"Successfully seeded Lead Access Passcode ID {entry.id} ('{label}').\n"
            f"Passcode stored safely hashed."
        ))

