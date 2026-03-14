.PHONY: proto

proto:
	# 出力先ディレクトリを作成
	mkdir -p pkg/pb

	# Go(pb + grpc) + grpc-gateway を生成
	protoc \
		-I api/proto \
		-I api/proto/third_party \
		--go_out=pkg/pb --go_opt=paths=source_relative \
		--go-grpc_out=pkg/pb --go-grpc_opt=paths=source_relative \
		--grpc-gateway_out=pkg/pb --grpc-gateway_opt=paths=source_relative \
		api/proto/user.proto