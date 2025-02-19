from sqlalchemy.orm import Session
from app.models.config import Config
from app.schema.config import ConfigBase, ConfigUpdate

def get_all_configs(db:Session):
    return db.query(Config).order_by(Config.id).all()

def get_config_by_id(db:Session, config_id:int):
    return db.query(Config).filter(Config.id ==config_id).first()

def update_config(db:Session, config_id:int, config_update:ConfigUpdate):
    config_update = config_update.model_dump()
    db.query(Config).filter(Config.id == config_id).update(config_update,synchronize_session=False)
    db.commit()
    return db.query(Config).filter(Config.id == config_id).first()