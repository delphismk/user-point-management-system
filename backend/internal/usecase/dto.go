package usecase

type CreateUserInputDTO struct {
	Name string
}

type AddPointInputDTO struct {
	ID        string
	AddPoints int32
}

type GetUserInputDTO struct {
	ID string
}

type UserOutputDTO struct {
	ID     string
	Name   string
	Points int32
}
