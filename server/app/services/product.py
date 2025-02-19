from sqlalchemy.orm import Session
from app.models.product import Product
from app.schema.product import ProductCreate, ProductUpdate

def get_all_products(db: Session):
    return db.query(Product).all()

def get_product_by_id(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()

def create_product(db: Session, product_create: ProductCreate):
    product = Product(
        name=product_create.name,
        slug=product_create.slug,
        is_active=product_create.is_active,
        intro=product_create.intro,
        price=product_create.price,
        description=product_create.description,
        keywords=product_create.keywords,
        id_user=product_create.id_user,
        id_category=product_create.id_category, 
    )
    db.add(product)  
    db.commit()
    db.refresh(product)
    return product

def update_product(db: Session, product_id: int, product_update: ProductUpdate):
    product_data = product_update.model_dump()
    db.query(Product).filter(Product.id == product_id).update(product_data, synchronize_session=False)
    db.commit()
    return db.query(Product).filter(Product.id == product_id).first()

def delete_product(db: Session, product_id: int):
    db.query(Product).filter(Product.id == product_id).delete()
    db.commit()
    return product_id