from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database_postgresql import get_db
from app.services.category import get_all_categories, get_category_by_id, create_category, update_category, delete_category
from app.schema.category import CategoryResponse, CategoryCreate, CategoryUpdate

router = APIRouter(prefix="/category", tags=["Category"])

@router.get("/", response_model=list[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return get_all_categories(db)

@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category_obj = get_category_by_id(db, category_id)
    if not category_obj:
        raise HTTPException(status_code=404, detail="Category not found")
    return category_obj

@router.post("/", response_model=CategoryCreate)    
def post_category(category: CategoryCreate, db: Session = Depends(get_db)):
    return create_category(db, category)

@router.put("/{category_id}", response_model=CategoryUpdate)
def put_category(category_id: int, category: CategoryUpdate, db: Session = Depends(get_db)):
    category_obj = get_category_by_id(db, category_id)
    if not category_obj:
        raise HTTPException(status_code=404, detail="Category not found")
    return update_category(db, category_obj.id, category)

@router.delete("/{category_id}")
def delete_category_by_id(category_id: int, db: Session = Depends(get_db)):
    category_obj = get_category_by_id(db, category_id)
    if not category_obj:
        raise HTTPException(status_code=404, detail="Category not found")
    return delete_category(db, category_obj.id)