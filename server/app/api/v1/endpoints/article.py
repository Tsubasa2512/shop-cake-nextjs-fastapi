from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database_postgresql import get_db
from app.services.article import get_all_articles, get_article_by_id, create_article, update_article, delete_article
from app.schema.article import ArticleResponse, ArticleCreate, ArticleUpdate

router = APIRouter(prefix="/article", tags=["Article"])

@router.get("/", response_model=list[ArticleResponse])
def get_articles(db: Session = Depends(get_db)):
    return get_all_articles(db)

@router.get("/{article_id}", response_model=ArticleResponse)    
def get_article(article_id: int, db: Session = Depends(get_db)):
    article_obj = get_article_by_id(db, article_id)
    if not article_obj:
        raise HTTPException(status_code=404, detail="Article not found")
    return article_obj

@router.post("/", response_model=ArticleCreate)
def post_article(article: ArticleCreate, db: Session = Depends(get_db)):
    return create_article(db, article)

@router.put("/{article_id}", response_model=ArticleUpdate)
def put_article(article_id: int, article: ArticleUpdate, db: Session = Depends(get_db)):
    article_obj = get_article_by_id(db, article_id)
    if not article_obj:
        raise HTTPException(status_code=404, detail="Article not found")
    return update_article(db, article_obj.id, article)

@router.delete("/{article_id}")
def delete_article_by_id(article_id: int, db: Session = Depends(get_db)):
    article_obj = get_article_by_id(db, article_id)
    if not article_obj:
        raise HTTPException(status_code=404, detail="Article not found")
    return delete_article(db, article_obj.id)

