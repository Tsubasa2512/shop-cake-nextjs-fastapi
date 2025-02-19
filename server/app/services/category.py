from sqlalchemy.orm import Session
from app.models.category import Category
from app.schema.category import CategoryCreate,CategoryUpdate

def get_all_categories(db: Session):
    return db.query(Category).all()

def get_category_by_id(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()

def create_category(db: Session, category_create: CategoryCreate):
    category = Category(
        name=category_create.name,
        slug=category_create.slug,
        is_active=category_create.is_active,
        id_user=category_create.id_user,
        id_menu=category_create.id_menu, 
    )
    db.add(category)  
    db.commit()
    db.refresh(category)
    return category

def update_category(db: Session, category_id: int, category_update: CategoryUpdate):
    category_data = category_update.model_dump()
    db.query(Category).filter(Category.id == category_id).update(category_data, synchronize_session=False)
    db.commit()
    return db.query(Category).filter(Category.id == category_id).first()

def delete_category(db: Session, category_id: int):
    db.query(Category).filter(Category.id == category_id).delete()
    db.commit()
    return category_id