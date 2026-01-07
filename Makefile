.PHONY: proto
proto:
	# 出力先ディレクトリを作成
	mkdir -p pkg/pb
	# protoファイルからGoコードを生成
	protoc --go_out=. --go_opt=module=github.com/delphismk/user-point-management-system \
		--go-grpc_out=. --go-grpc_opt=module=github.com/delphismk/user-point-management-system \
		api/proto/user.proto