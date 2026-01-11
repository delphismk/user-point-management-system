// go → postgres 接続手続き、AutoMigration 等を担うパッケージ
package db

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/delphismk/user-point-management-system/internal/infrastructure/db/entity"
)

func NewDB(host, user, pass, name, port string) *gorm.DB {

	// Data source name 作成
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tokyo",
		host, user, pass, name, port,
	)

	// DB接続設定
	db, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		panic("failed to connect database: " + err.Error())
	}

	// AutoMigration
	if err := db.AutoMigrate(
		&entity.User{},
	); err != nil {
		panic("failed to migrate database: " + err.Error())
	}

	return db

}
