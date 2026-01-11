// go → postgres 接続手続き、AutoMigration 等を担うパッケージ
package entity

type User struct {
	ID     string `gorm:"primaryKey;column:id"`
	Name   string `gorm:"column:name"`
	Points int32  `gorm:"column:points"`
}

func (User) TableName() string {
	return "users"
}
