from sqlalchemy.orm import Session  
from app.models.article import Article
from app.schema.article import ArticleCreate,ArticleUpdate

def get_all_articles(db: Session):
    return db.query(Article).all()

def get_article_by_id(db: Session, article_id: int):
    return db.query(Article).filter(Article.id == article_id).first()

def create_article(db: Session, article_create: ArticleCreate):
    article = Article(
        name=article_create.name,
        slug=article_create.slug,
        is_active=article_create.is_active,
        intro=article_create.intro,
        description=article_create.description,
        tag=article_create.tag,
        keywords=article_create.keywords,
        id_user=article_create.id_user,
        id_category=article_create.id_category, 
    )
    db.add(article)  
    db.commit()
    db.refresh(article)
    return article

def update_article(db: Session, article_id: int, article_update: ArticleUpdate):
    article_data = article_update.model_dump()
    db.query(Article).filter(Article.id == article_id).update(article_data, synchronize_session=False)
    db.commit()
    return db.query(Article).filter(Article.id == article_id).first()

def delete_article(db: Session, article_id: int):
    db.query(Article).filter(Article.id == article_id).delete()
    db.commit()
    return article_id