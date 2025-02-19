from sqlalchemy.orm import Session
from app.models.gallery import Gallery
from app.schema.gallery import GalleryCreate, GalleryUpdate

def get_all_gallerys(db: Session):
    return db.query(Gallery).all()

def get_gallery_by_id(db: Session, gallery_id: int):
    return db.query(Gallery).filter(Gallery.id == gallery_id).first()

def create_gallery(db: Session, gallery_create: GalleryCreate):
    gallery = Gallery(
        name=gallery_create.name,
        slug=gallery_create.slug,
        is_active=gallery_create.is_active,
        intro=gallery_create.intro,
        id_user=gallery_create.id_user,
        id_category=gallery_create.id_category, 
    )
    db.add(gallery)  
    db.commit()
    db.refresh(gallery)
    return gallery

def update_gallery(db: Session, gallery_id: int, gallery_update: GalleryUpdate):
    gallery_data = gallery_update.model_dump()
    db.query(Gallery).filter(Gallery.id == gallery_id).update(gallery_data, synchronize_session=False)
    db.commit()
    return db.query(Gallery).filter(Gallery.id == gallery_id).first() 

def delete_gallery(db: Session, gallery_id: int):
    db.query(Gallery).filter(Gallery.id == gallery_id).delete()
    db.commit()
    return gallery_id
