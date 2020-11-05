def test_service_get(session):
    from users.models import User
    from users.service import get

    user = User(name="test")
    session.add(user)
    session.commit()

    test_user = get(session, user.id)

    assert user.id == test_user.id
    assert user.name == test_user.name


def test_service_get_by_name(session):
    from users.models import User
    from users.service import get_by_name

    user1 = User(name="test1")
    user2 = User(name="test2")
    session.add(user1)
    session.add(user2)
    session.commit()

    test_user = get_by_name(session, "test1")

    assert user1.id == test_user.id
    assert user1.name == test_user.name


def test_service_get_all(session):
    from users.models import User
    from users.service import get_all

    user = User(name="test")
    session.add(user)
    session.commit()

    query = get_all(session)

    assert query.count() == 1


def test_service_create(session):
    from users.models import UserCreate
    from users.service import create

    user = create(session, UserCreate(name="test"))

    assert user.id is not None
    assert user.name == "test"


def test_service_update(session):
    from users.models import User, UserCreate
    from users.service import update

    user = User(name="test")
    session.add(user)
    session.commit()

    user = update(session, user, UserCreate(name="test2"))

    assert user.name == "test2"


def test_service_delete(session):
    from users.models import User
    from users.service import delete

    user1 = User(name="test1")
    user2 = User(name="test2")
    session.add(user1)
    session.add(user2)
    session.commit()

    delete(session, user1.id)

    count = session.query(User).filter(User.id == user1.id).count()
    assert count == 0
