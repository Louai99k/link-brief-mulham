import Toolbar from "@/components/Toolbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { useNavigate } from "react-router";
import ROUTES from "@/constants/urls";
import { useAuth } from "@/stores/auth-store";

import type { SignInInputs, SignUpInputs } from "@/types/auth";

const Login = () => {
  const { register, handleSubmit, reset } = useForm<
    SignInInputs | SignUpInputs
  >();
  const [formType, setFormType] = useState("sign-in");
  const navigate = useNavigate();
  const { setIsAuth, setAccessToken, setUserEmail } = useAuth();
  const signUp = useMutation(
    trpc.auth.signUp.mutationOptions({
      onSuccess() {
        setFormType("sign-in");
      },
      onError() {},
    }),
  );

  const signIn = useMutation(
    trpc.auth.signIn.mutationOptions({
      onSuccess(data) {
        setAccessToken(data.jwt);
        setIsAuth(true);
        setUserEmail(data.user.email);
        navigate(ROUTES.DASHBOARD);
      },
    }),
  );

  const onSubmit: SubmitHandler<SignInInputs | SignUpInputs> = (data) => {
    if (formType === "sign-in") {
      signIn.mutate({
        email: data.email,
        password: data.password,
      });
      return;
    }

    const signUpData = data as SignUpInputs;
    signUp.mutate(signUpData);
  };

  return (
    <div className="relative">
      <Toolbar showSignButton={false} />
      <div className="px-2 pt-32 bg-slate-100 w-screen h-screen flex items-center flex-col text-center gap-4">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl mb-8">
          Welcome To LinkBrief
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs
            value={formType}
            onValueChange={(v) => {
              setFormType(v);
              reset();
            }}
            defaultValue="sign-in"
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <Card>
                <CardContent className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...register("password")}
                      id="password"
                      type="password"
                      placeholder="Enter your password..."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Sign In</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="sign-up">
              <Card>
                <CardContent className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">New password</Label>
                    <Input
                      {...register("password")}
                      id="password"
                      type="password"
                      placeholder="Enter your password..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="passwordConfirm">
                      Password confirmation
                    </Label>
                    <Input
                      {...register("passwordConfirm")}
                      id="passwordConfirm"
                      type="password"
                      placeholder="Confirm your password..."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Sign Up</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  );
};

export default Login;
