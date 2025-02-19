from sqlalchemy.orm import Session
from app.models.menu import Menu
from app.schema.menu import MenuCreate,MenuUpdate 


def get_all_menus(db: Session):
    return db.query(Menu).all()

def get_menu_by_id(db: Session, menu_id: int):
    return db.query(Menu).filter(Menu.id == menu_id).first()

def create_menu(db: Session, menu_create: MenuCreate):
    menu = Menu(
        name=menu_create.name,
        slug=menu_create.slug,
        is_active=menu_create.is_active,
        index_menu=menu_create.index_menu,
        id_user=menu_create.id_user,
        id_type=menu_create.id_type, 
    )
    db.add(menu)    
    db.commit()
    db.refresh(menu)
    return menu

def update_menu(db: Session, menu_id: int, menu_update: MenuUpdate):
    menu_data = menu_update.model_dump()
    db.query(Menu).filter(Menu.id == menu_id).update(menu_data, synchronize_session=False)
    db.commit()
    return db.query(Menu).filter(Menu.id == menu_id).first()


def delete_menu(db: Session, menu_id: int):
    db.query(Menu).filter(Menu.id == menu_id).delete()
    db.commit()
    return menu_id