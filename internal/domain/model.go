package domain

import "errors"

type User struct {
	ID     string
	Name   string
	Points int32
}

// コンストラクタ
func NewUser(id, name string) (*User, error) {
	// nameが来なかったら止めてエラー発生
	if name == "" {
		return nil, errors.New("name is required")
	}

	return &User{
		ID:     id,
		Name:   name,
		Points: 0,
	}, nil
}

// 計算ロジックはdomainに
func (u *User) AddPoints(addPoints int32) error {
	if addPoints <= 0 {
		return errors.New("加算できるPointは1以上です")
	}

	u.Points += addPoints
	return nil
}
