"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { realizarLogin } from "@/services/Usuario";

interface BakcendResponse {
  code: number;
  msg: string;
}

interface FormErros {
  email?: string;
  senha?: string;
  geral?: string;
}

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENHA_MIN = 6;

function validarFormulario(email: string, senha: string): FormErros {
  const erros: FormErros = {};

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

export function LoginForm() {
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

    const errosValidacao = validarFormulario(email, senha);
    if (Object.keys(errosValidacao).length > 0) {
      setErros(errosValidacao);
      return;
    }

    setCarregando(true);
    setErros({});

    try {
      const res: BakcendResponse = await realizarLogin(email, senha);
      if (res.code === 200) {
        router.push("/conta/perfil");
      } else {
        setErros({ geral: res.msg || "Email ou senha inválidos." });
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl font-bold text-foreground">
            Entrar
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Acesse sua conta para continuar
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {erros.geral && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
                {erros.geral}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  limparErro("email");
                }}
                aria-invalid={!!erros.email}
                aria-describedby={erros.email ? "erro-email" : undefined}
                className={erros.email ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {erros.email && (
                <p id="erro-email" className="text-sm text-destructive">
                  {erros.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  limparErro("senha");
                }}
                aria-invalid={!!erros.senha}
                aria-describedby={erros.senha ? "erro-senha" : undefined}
                className={erros.senha ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {erros.senha && (
                <p id="erro-senha" className="text-sm text-destructive">
                  {erros.senha}
                </p>
              )}
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Link
                href="/registro"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Criar conta
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}