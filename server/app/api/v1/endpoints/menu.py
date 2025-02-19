from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database_postgresql import get_db
from app.services.menu import get_all_menus, get_menu_by_id, create_menu, update_menu, delete_menu
from app.schema.menu import MenuResponse, MenuCreate, MenuUpdate

router = APIRouter(prefix="/menu", tags=["Menu"])

@router.get("/", response_model=list[MenuResponse]) 
def get_menus(db: Session = Depends(get_db)):
    return get_all_menus(db)

@router.get("/{menu_id}", response_model=MenuResponse)
def get_menu(menu_id: int, db: Session = Depends(get_db)):
    menu_obj = get_menu_by_id(db, menu_id)
    if not menu_obj:
        raise HTTPException(status_code=404, detail="Menu not found")
    return menu_obj

@router.post("/", response_model=MenuCreate)
def post_menu(menu: MenuCreate, db: Session = Depends(get_db)):
    return create_menu(db, menu)

@router.put("/{menu_id}", response_model=MenuUpdate)
def put_menu(menu_id: int, menu: MenuUpdate, db: Session = Depends(get_db)):
    menu_obj = get_menu_by_id(db, menu_id)
    if not menu_obj:
        raise HTTPException(status_code=404, detail="Menu not found")
    print(menu_obj.id)    
    return update_menu(db, menu_obj.id, menu)

@router.delete("/{menu_id}")
def delete_menu_by_id(menu_id: int, db: Session = Depends(get_db)):
    menu_obj = get_menu_by_id(db, menu_id)
    if not menu_obj:
        raise HTTPException(status_code=404, detail="Menu not found")
    return delete_menu(db, menu_obj.id)