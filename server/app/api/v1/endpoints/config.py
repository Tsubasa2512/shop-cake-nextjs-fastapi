from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database_postgresql import get_db
from app.services.config import get_all_configs, get_config_by_id, update_config
from app.schema.config import ConfigBase ,ConfigUpdate

router = APIRouter(prefix="/config", tags=["Config Gerenal"])   

@router.get("/",response_model=list[ConfigBase])
def get_configs(db:Session = Depends(get_db)):
    return get_all_configs(db)

@router.put("/{config_id}",response_model=ConfigUpdate)
def put_cofig(config_id:int, config:ConfigUpdate, db:Session = Depends(get_db)):
    config_obj = get_config_by_id(db,config_id)
    if not config_obj:
        raise HTTPException(status_code=404, detail="Config Gerenal not found")
    return update_config(db,config_obj.id,config)