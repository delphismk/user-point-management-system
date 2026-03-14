package main

import (
	"context"
	"log"
	"net/http"

	pb "github.com/delphismk/user-point-management-system/pkg/pb"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	// HTTPルータ(multiplexer)(JSON - proto)
	mux := runtime.NewServeMux()

	// gatewayサーバが接続するgRPCサーバアドレス定義
	gRPCEndpoint := "localhost:50051"

	// insecureのオプション定義
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	}

	// ユーザ関連サービスのハンドラーをmuxに反映
	// (Handler内部でDialしてRPC呼べる状態になる)
	if err := pb.RegisterUserServiceHandlerFromEndpoint(ctx, mux, gRPCEndpoint, opts); err != nil {
		log.Printf("failed to register gateway: %v", err)
	}

	//GWサーバアドレス
	addr := ":8080"
	log.Printf("HTTP gateway server is running on %s to gRPC %s", addr, gRPCEndpoint)

	// HTTP通信の受付開始
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
