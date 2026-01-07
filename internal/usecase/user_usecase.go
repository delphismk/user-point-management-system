package usecase

import (
	"context"
	domain "user-point-management-system/internal/domain"

	"github.com/google/uuid"
)

// repoが使えるUsecaseの構造体を定義
type UserUsecase struct {
	repository domain.UserRepository
}

// Usecaseの構造体を返すにはrepoをくださいと言われている(DI準備)
func NewUserUsecase(repo domain.UserRepository) *UserUsecase {
	return &UserUsecase{
		repository: repo,
	}
}

// User作成
func (uc *UserUsecase) CreateUser(ctx context.Context, inputDTO CreateUserInputDTO) (*UserOutputDTO, error) {
	// usecaseにて一意なIDを作成
	uniqueID := uuid.New().String()

	// DTO → Domain model へ変換
	// domain側のerrが発生すればそれを返す
	user, err := domain.NewUser(uniqueID, inputDTO.Name)
	if err != nil {
		return nil, err
	}

	// domainにSave()を委託
	if err := uc.repository.Save(ctx, user); err != nil {
		return nil, err
	}

	//OuputDTOに変換してpresentationに渡す
	return &UserOutputDTO{
		ID:     user.ID,
		Name:   user.Name,
		Points: user.Points,
	}, nil
}

// ポイント追加処理
func (uc *UserUsecase) AddPoints(ctx context.Context, inputDTO AddPointInputDTO) (*UserOutputDTO, error) {
	// 指定されたIDに対応するUser(domainモデル)をFindByIDで取得(domainに委託)
	user, err := uc.repository.FindByID(ctx, inputDTO.ID)
	if err != nil {
		return nil, err
	}
	// Addpoint処理
	// // TODO: Addpointsのビジネスロジックの実装(負はダメとかいくつ以上はダメとか？)
	// user.Points += inputDTO.AddPoints

	//AddPoint処理
	//inputDTOのAddPointsを本メソッド内でインスタンス化したdomainのUser.Pointsへ加算
	if err := user.AddPoints(inputDTO.AddPoints); err != nil {
		return nil, err
	}

	// Update処理
	if err := uc.repository.Update(ctx, user); err != nil {
		return nil, err
	}

	// Domain →　DTO処理
	return &UserOutputDTO{
		ID:     user.ID,
		Name:   user.Name,
		Points: user.Points,
	}, nil
}

func (uc *UserUsecase) GetUser(ctx context.Context, inputDTO GetUserInputDTO) (*UserOutputDTO, error) {
	//指定されたIDに対応するUser(domainモデル)をFindByIDで取得(domainに委託)
	user, err := uc.repository.FindByID(ctx, inputDTO.ID)
	if err != nil {
		return nil, err
	}

	// Domain →　DTO処理
	return &UserOutputDTO{
		ID:     user.ID,
		Name:   user.Name,
		Points: user.Points,
	}, nil

}
