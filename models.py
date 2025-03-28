from drizzle_orm import Model, fields

class User(Model):
    username = fields.CharField(max_length=255, unique=True)
    hashed_password = fields.CharField(max_length=255)
    mfa_secret = fields.CharField(max_length=255)

class Role(Model):
    name = fields.CharField(max_length=255, unique=True)

class Permission(Model):
    name = fields.CharField(max_length=255, unique=True)
    role = fields.ForeignKey(Role, related_name='permissions')
