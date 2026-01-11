package main

import (
	"net"

	infrastructure_db "github.com/delphismk/user-point-management-system/internal/infrastructure/db"
	presentation "github.com/delphismk/user-point-management-system/internal/presentation/grpc"
	usecase "github.com/delphismk/user-point-management-system/internal/usecase"

	db_repo "github.com/delphismk/user-point-management-system/internal/infrastructure/db/repositories"

	pb "github.com/delphismk/user-point-management-system/pkg/pb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {

	// DB接続の初期化
	db := infrastructure_db.NewDB(
		"localhost",
		"user",
		"password",
		"user_db",
		"5432",
	)

	// リポジトリの初期化
	userRepo := db_repo.NewUserDBRepo(db)

	// ユースケースの初期化
	userUsecase := usecase.NewUserUsecase(userRepo)

	// gRPCサーバーの初期化
	s := grpc.NewServer()

	// プレゼンテーション層の初期化
	userHandler := presentation.NewUserHandler(userUsecase)
	pb.RegisterUserServiceServer(s, userHandler)

	// リフレクションの有効化（デバッグ用）
	reflection.Register(s)

	// サーバーのリスニング
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		panic("failed to listen: " + err.Error())
	}

	// gRPCサーバーの起動
	println("gRPCServer is running on port %s", ":50051")
	if err := s.Serve(lis); err != nil {
		panic("failed to serve: " + err.Error())
	}
}
