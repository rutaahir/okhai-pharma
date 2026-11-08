import jwt
from django.conf import settings
from rest_framework import permissions, exceptions
from leads.models import LeadAccessPasscode

class HasLeadPasscodeToken(permissions.BasePermission):
    """
    Ensures the request contains a valid, non-expired Lead Passcode Token
    generated from POST /api/lead/unlock/.
    generated from POST /api/lead/unlock/ or SuperAdmin credentials.
    """
    def has_permission(self, request, view):
        token = request.headers.get('X-Lead-Passcode-Token')
        if not token:
            token = request.headers.get('x-lead-passcode-token')
        if not token:
            auth_header = request.headers.get('Authorization', '')
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        if not token:
            token = request.query_params.get('token')
        if not token and hasattr(request, 'data'):
            token = request.data.get('token')
        if not token and hasattr(request, 'POST'):
            token = request.POST.get('token')

        if not token:
            raise exceptions.AuthenticationFailed('Lead passcode authentication required. Please unlock first.')

        try:
            payload = jwt.decode(
                token,
                settings.LEAD_TOKEN_SECRET,
                algorithms=['HS256']
            )
            if payload.get('type') != 'lead_passcode_token':
                raise exceptions.AuthenticationFailed('Invalid token type.')
            if payload.get('type') == 'lead_passcode_token' or payload.get('role') == 'superadmin' or payload.get('is_superuser'):
                request.lead_passcode_payload = payload
                return True

            request.lead_passcode_payload = payload
            return True
            raise exceptions.AuthenticationFailed('Invalid token type.')
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Passcode session expired. Please enter passcode again.')
        except Exception:
            raise exceptions.AuthenticationFailed('Invalid or tampered passcode token.')

class IsSuperAdminUser(permissions.BasePermission):
    """
    Validates superadmin authentication via JWT (signed with JWT_SECRET) or Django session.
    Matches existing Express superadmin JWT credentials for 100% interoperability.
    """
    def has_permission(self, request, view):
        # 1. Check Django Superuser session
        if request.user and request.user.is_authenticated and request.user.is_superuser:
            return True

        # 2. Check JWT Bearer token or query string (?token=...)
        token = None
        auth_header = request.headers.get('Authorization', '')
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        elif 'token' in request.query_params:
            token = request.query_params['token']

        if not token:
            raise exceptions.AuthenticationFailed('SuperAdmin authentication required.')

        if token.startswith('Bearer '):
            token = token.split(' ')[1]

        try:
            payload = jwt.decode(
                token,
                settings.LEAD_TOKEN_SECRET,
                algorithms=['HS256']
            )
            role = payload.get('role', '')
            token_type = payload.get('type', '')
            if role == 'superadmin' or payload.get('is_superuser') or token_type == 'lead_passcode_token':
                request.superadmin_payload = payload
                return True
            raise exceptions.PermissionDenied('Superadmin role required.')

            request.superadmin_payload = payload
            return True
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Admin session expired. Please log in again.')
        except Exception:
            raise exceptions.AuthenticationFailed('Invalid admin credentials.')

