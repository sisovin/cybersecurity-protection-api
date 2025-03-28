from drizzle_orm import Database, Model, fields

# Set up PostgreSQL connection using Drizzle ORM
db = Database('postgresql://user:password@localhost:5432/mydatabase')

class User(Model):
    username = fields.CharField(max_length=255, unique=True)
    hashed_password = fields.CharField(max_length=255)
    mfa_secret = fields.CharField(max_length=255)

class Role(Model):
    name = fields.CharField(max_length=255, unique=True)

class Permission(Model):
    name = fields.CharField(max_length=255, unique=True)
    role = fields.ForeignKey(Role, related_name='permissions')

# Define functions for interacting with the database
def create_user(username, hashed_password, mfa_secret):
    user = User(username=username, hashed_password=hashed_password, mfa_secret=mfa_secret)
    db.save(user)
    return user

def get_user_by_username(username):
    return User.objects.filter(username=username).first()

def create_role(name):
    role = Role(name=name)
    db.save(role)
    return role

def get_role_by_name(name):
    return Role.objects.filter(name=name).first()

def create_permission(name, role):
    permission = Permission(name=name, role=role)
    db.save(permission)
    return permission

def get_permission_by_name(name):
    return Permission.objects.filter(name=name).first()
