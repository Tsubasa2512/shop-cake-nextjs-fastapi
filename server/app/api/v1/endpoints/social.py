from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database_postgresql import get_db
from app.services.social import get_all_socials,get_social_by_id,update_social
from app.schema.social import SocialBase,SocialUpdate

router = APIRouter(prefix="/social", tags=["Social"])

@router.get("/", response_model=list[SocialBase])
def get_socials(db:Session = Depends(get_db)):
    return get_all_socials(db)


@router.put("/{social_id}",response_model=SocialUpdate)
def put_social(social_id:int , social: SocialUpdate, db:Session = Depends(get_db)):
    social_obj = get_social_by_id(db, social_id)
    if not social_obj:
        raise HTTPException(status_code=404, detail="Social not found")
    return update_social(db, social_obj.id,social)