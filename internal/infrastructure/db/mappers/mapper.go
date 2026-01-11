package mappers

import (
	"github.com/delphismk/user-point-management-system/internal/domain"
	"github.com/delphismk/user-point-management-system/internal/infrastructure/db/entity"
)

// DB用モデル → ドメインモデル
func ToUserDomain(e *entity.User) *domain.User {
	return &domain.User{
		ID:     e.ID,
		Name:   e.Name,
		Points: e.Points,
	}
}

// ドメインモデル → DB用モデル (保存時に使うので追加しておきました)
func ToUserEntity(u *domain.User) *entity.User {
	return &entity.User{
		ID:     u.ID,
		Name:   u.Name,
		Points: u.Points,
	}
}
