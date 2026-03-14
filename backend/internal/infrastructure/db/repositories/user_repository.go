package repositories

import (
	"context"
	"errors"

	"github.com/delphismk/user-point-management-system/internal/domain"
	"github.com/delphismk/user-point-management-system/internal/infrastructure/db/entity"
	"github.com/delphismk/user-point-management-system/internal/infrastructure/db/mappers"

	"gorm.io/gorm"
)

// DBを持つUserDBのRepoを定義
type UserDBRepo struct {
	db *gorm.DB
}

// Domain.Repoを満たすようにUserRBRepoを返す
func NewUserDBRepo(db *gorm.DB) domain.UserRepository {
	return &UserDBRepo{db: db}
}

// eager load
func (r *UserDBRepo) preloadAll(db *gorm.DB) *gorm.DB {
	return db.
		Preload("User")
}

func (r *UserDBRepo) Save(ctx context.Context, user *domain.User) error {
	// ドメインモデル → エンティティ変換
	entity := mappers.ToUserEntity(user)

	if err := r.db.WithContext(ctx).Create(&entity).Error; err != nil {
		return err
	}
	return nil
}

func (r *UserDBRepo) FindByID(ctx context.Context, id string) (*domain.User, error) {
	var entity entity.User

	if err := r.db.WithContext(ctx).First(&entity, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		return nil, err
	}

	userDomain := mappers.ToUserDomain(&entity)
	return userDomain, nil
}

func (r *UserDBRepo) Update(ctx context.Context, user *domain.User) error {
	entity := mappers.ToUserEntity(user)

	if err := r.db.WithContext(ctx).Save(&entity).Error; err != nil {
		return err
	}

	return nil

}
