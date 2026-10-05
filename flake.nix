{
  description = "dev setup";

  # 1) Pin nixpkgs so you can update Node later with `nix flake update`
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
      vercel = pkgs.writeShellApplication {
        name = "vercel";
        text = ''
          if [ ! -x ./node_modules/.bin/vercel ]; then
            echo "Vercel CLI is not installed in ./node_modules/.bin/vercel. Run: pnpm install" >&2
            exit 127
          fi

          exec ./node_modules/.bin/vercel "$@"
        '';
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_22
          pnpm
          vercel
        ];
      };
    };
}
