from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database_postgresql import get_db
from app.services.product import get_all_products, get_product_by_id, create_product, update_product, delete_product
from app.schema.product import ProductResponse, ProductCreate, ProductUpdate

router = APIRouter(prefix="/product", tags=["Product"])

@router.get("/", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return get_all_products(db)

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product_obj = get_product_by_id(db, product_id)
    if not product_obj:
        raise HTTPException(status_code=404, detail="Product not found")
    return product_obj
@router.post("/", response_model=ProductCreate)
def post_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product)

@router.put("/{product_id}", response_model=ProductUpdate)
def put_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    product_obj = get_product_by_id(db, product_id)
    if not product_obj:
        raise HTTPException(status_code=404, detail="Product not found")
    return update_product(db, product_obj.id, product)

@router.delete("/{product_id}")
def delete_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product_obj = get_product_by_id(db, product_id)
    if not product_obj:
        raise HTTPException(status_code=404, detail="Product not found")
    return delete_product(db, product_obj.id)
