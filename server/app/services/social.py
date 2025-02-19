from sqlalchemy.orm import Session
from app.models.social import Social
from app.schema.social import SocialBase,SocialUpdate

def get_all_socials(db:Session):
    return db.query(Social).order_by(Social.id).all()

def get_social_by_id(db:Session, social_id:int):
    return db.query(Social).filter(Social.id == social_id).first()

def update_social(db:Session, social_id:int, social_update: SocialUpdate):
    social_update = social_update.model_dump()
    db.query(Social).filter(Social.id == social_id).update(social_update,synchronize_session=False)
    db.commit()
    return db.query(Social).filter(Social.id == social_id).first()