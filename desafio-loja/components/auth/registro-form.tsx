"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { api } from "@/services";
import { realizarCadastro } from "@/services/Usuario";

interface BackendResponse {
  code: number;
  msg: string;
  token?: string;
}

interface FormErros {
  nome?: string;
  email?: string;
  senha?: string;
  geral?: string;
}

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENHA_MIN = 6;
const NOME_MIN = 3;

function validarFormulario(
  nome: string,
  email: string,
  senha: string,
): FormErros {
  const erros: FormErros = {};

  if (!nome.trim()) {
    erros.nome = "O nome é obrigatório.";
  } else if (nome.trim().length < NOME_MIN) {
    erros.nome = `O nome deve ter no mínimo ${NOME_MIN} caracteres.`;
  }

  if (!email.trim()) {
    erros.email = "O email é obrigatório.";
  } else if (!REGEX_EMAIL.test(email)) {
    erros.email = "Informe um email válido.";
  }

  if (!senha) {
    erros.senha = "A senha é obrigatória.";
  } else if (senha.length < SENHA_MIN) {
    erros.senha = `A senha deve ter no mínimo ${SENHA_MIN} caracteres.`;
  }

  return erros;
}

export function RegistroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<FormErros>({});
  const router = useRouter();

  function limparErro(campo: keyof FormErros) {
    setErros((prev) => ({ ...prev, [campo]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errosValidacao = validarFormulario(nome, email, senha);
    if (Object.keys(errosValidacao).length > 0) {
      setErros(errosValidacao);
      return;
    }

    setCarregando(true);
    setErros({});

    try {
      const res: BackendResponse = await realizarCadastro(email, senha, nome);
      
      if (res.code === 201) {
        router.push("/perfil");
      } else {
        setErros({ geral: res.msg || "Erro ao criar conta. Tente novamente." });
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      setErros({ geral: "Erro de conexão. Tente novamente mais tarde." });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl font-bold text-foreground">
            Criar conta
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Preencha os dados para se registrar
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {erros.geral && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
                {erros.geral}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  limparErro("nome");
                }}
                aria-invalid={!!erros.nome}
                aria-describedby={erros.nome ? "erro-nome" : undefined}
                className={
                  erros.nome
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {erros.nome && (
                <p id="erro-nome" className="text-sm text-destructive">
                  {erros.nome}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  limparErro("email");
                }}
                aria-invalid={!!erros.email}
                aria-describedby={erros.email ? "erro-email" : undefined}
                className={
                  erros.email
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {erros.email && (
                <p id="erro-email" className="text-sm text-destructive">
                  {erros.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-senha">Senha</Label>
              <Input
                id="reg-senha"
                type="password"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  limparErro("senha");
                }}
                aria-invalid={!!erros.senha}
                aria-describedby={erros.senha ? "erro-senha" : undefined}
                className={
                  erros.senha
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {erros.senha && (
                <p id="erro-senha" className="text-sm text-destructive">
                  {erros.senha}
                </p>
              )}
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={carregando}>
              {carregando ? "Criando conta..." : "Criar conta"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link
                href="/login"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Entrar
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
