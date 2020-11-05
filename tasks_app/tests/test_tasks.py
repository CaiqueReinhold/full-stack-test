def test_service_get(session):
    from tasks.models import Task
    from tasks.service import get

    task = Task(description="test", user_id=1)
    session.add(task)
    session.commit()

    test_task = get(session, task.id)

    assert task.id == test_task.id
    assert task.description == test_task.description


def test_service_get_by_name(session):
    from tasks.models import Task
    from tasks.service import get_by_user

    task1 = Task(description="test1", user_id=1)
    task2 = Task(description="test2", user_id=2)
    session.add(task1)
    session.add(task2)
    session.commit()

    query = get_by_user(session, 2)
    count = query.count()

    assert count == 1


def test_service_create(session):
    from tasks.models import TaskCreate
    from tasks.service import create

    task = create(session, TaskCreate(description="test", user_id=1))

    assert task.id is not None
    assert task.description == "test"
    assert not task.state
    assert task.user_id == 1


def test_service_update(session):
    from tasks.models import Task, TaskUpdate
    from tasks.service import update

    task = Task(description="test", user_id=1)
    session.add(task)
    session.commit()

    task = update(session, task, TaskUpdate(state=True))

    assert task.id is not None
    assert task.description == "test"
    assert task.state
    assert task.user_id == 1


def test_service_delete(session):
    from tasks.models import Task
    from tasks.service import delete

    task1 = Task(description="test1", user_id=1)
    task2 = Task(description="test2", user_id=1)
    session.add(task1)
    session.add(task2)
    session.commit()

    delete(session, task1.id)

    count = session.query(Task).filter(Task.id == task1.id).count()
    assert count == 0
