package grpc

import (
	"context"

	"github.com/delphismk/user-point-management-system/internal/usecase"
	pb "github.com/delphismk/user-point-management-system/pkg/pb"
)

// コンパイルエラーを避けて未実装エラーを返せるようにと
// presentation層がusecaseのメソッドを使えるようにするためにusecase構造体を埋め込む
type UserHandler struct {
	pb.UnimplementedUserServiceServer
	userUsecase *usecase.UserUsecase
}

// Handler作るにはusecase構造体渡してねと言われている(DI準備)
func NewUserHandler(u *usecase.UserUsecase) *UserHandler {
	return &UserHandler{
		userUsecase: u,
	}
}

func (h *UserHandler) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.CreateUserResponse, error) {
	// pbの関数を用いてreqからuserNameを取得
	userName := req.GetUserName()

	//req → inputDTOへの変換
	inputDTO := usecase.CreateUserInputDTO{
		Name: userName,
	}

	// usecaseのCreateUserを呼び出す
	outputDTO, err := h.userUsecase.CreateUser(ctx, inputDTO)
	if err != nil {
		return nil, err
	}

	// DTO → grpc構造体に詰めて返す
	return &pb.CreateUserResponse{
		UserId:     outputDTO.ID,
		UserName:   outputDTO.Name,
		UserPoints: outputDTO.Points,
	}, nil
}

func (h *UserHandler) AddPoints(ctx context.Context, req *pb.AddPointsRequest) (*pb.AddPointsResponse, error) {
	// pbの関数を用いてreqのパラメタを取得
	userID := req.GetUserId()
	addPoints := req.GetAddPoints()

	// inputDTOにつめる
	inputDTO := usecase.AddPointInputDTO{
		ID:        userID,
		AddPoints: addPoints,
	}

	// usecaseのAddPoints関数を呼び出す
	outputDTO, err := h.userUsecase.AddPoints(ctx, inputDTO)
	if err != nil {
		return nil, err
	}

	return &pb.AddPointsResponse{
		UserId:     outputDTO.ID,
		UserPoints: outputDTO.Points,
	}, nil
}

func (h *UserHandler) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.GetUserResponse, error) {
	// pb関数使ってID取り出し
	userID := req.GetUserId()

	// inputDTOに詰めru
	inputDTO := usecase.GetUserInputDTO{
		ID: userID,
	}

	// usecaseにGetUser処理をお願いする
	outputDTO, err := h.userUsecase.GetUser(ctx, inputDTO)
	if err != nil {
		return nil, err
	}

	return &pb.GetUserResponse{
		UserId:     outputDTO.ID,
		UserName:   outputDTO.Name,
		UserPoints: outputDTO.Points,
	}, nil
}
