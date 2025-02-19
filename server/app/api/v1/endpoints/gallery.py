from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database_postgresql import get_db
from app.services.gallery import get_all_gallerys, get_gallery_by_id, create_gallery, update_gallery, delete_gallery
from app.schema.gallery import GalleryResponse, GalleryCreate, GalleryUpdate

router = APIRouter(prefix="/gallery", tags=["Gallery"])

@router.get("/", response_model=list[GalleryResponse])
def get_gallerys(db: Session = Depends(get_db)):
    return get_all_gallerys(db)

@router.get("/{gallery_id}", response_model=GalleryResponse)
def get_gallery(gallery_id: int, db: Session = Depends(get_db)):
    gallery_obj = get_gallery_by_id(db, gallery_id)
    if not gallery_obj:
        raise HTTPException(status_code=404, detail="Gallery not found")
    return gallery_obj

@router.post("/", response_model=GalleryCreate)
def post_gallery(gallery: GalleryCreate, db: Session = Depends(get_db)):
    return create_gallery(db, gallery)

@router.put("/{gallery_id}", response_model=GalleryUpdate)
def put_gallery(gallery_id: int, gallery: GalleryUpdate, db: Session = Depends(get_db)):
    gallery_obj = get_gallery_by_id(db, gallery_id)
    if not gallery_obj:
        raise HTTPException(status_code=404, detail="Gallery not found")
    return update_gallery(db, gallery_obj.id, gallery)

@router.delete("/{gallery_id}")
def delete_gallery_by_id(gallery_id: int, db: Session = Depends(get_db)):
    gallery_obj = get_gallery_by_id(db, gallery_id)
    if not gallery_obj:
        raise HTTPException(status_code=404, detail="Gallery not found")
    return delete_gallery(db, gallery_obj.id)