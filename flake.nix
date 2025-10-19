{
  description = "dev setup";

  # 1) Pin nixpkgs so you can update Node later with `nix flake update`
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs, ... }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs_22                    # Node >= 22.12 (meets your requirement)
        nodePackages_latest.pnpm     # recent pnpm from nixpkgs
        nodePackages_latest.vercel   # vercel CLI
      ];
    };
  };
}
