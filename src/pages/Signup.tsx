// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { z } from "zod";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useAuthStore } from "@/stores/authStore";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { toast } from "@/hooks/use-toast";
// // import { Loader2 } from "lucide-react";

// // const signupSchema = z
// //   .object({
// //     email: z.string().email("Please enter a valid email address"),
// //     password: z.string().min(6, "Password must be at least 6 characters"),
// //     confirmPassword: z.string(),
// //   })
// //   .refine((data) => data.password === data.confirmPassword, {
// //     message: "Passwords do not match",
// //     path: ["confirmPassword"],
// //   });

// // type SignupFormData = z.infer<typeof signupSchema>;

// // export default function Signup() {
// //   const navigate = useNavigate();
// //   const { signUp, loading, user } = useAuthStore();
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm<SignupFormData>({
// //     resolver: zodResolver(signupSchema),
// //   });

// //   // Redirect if already authenticated
// //   if (user && !loading) {
// //     navigate("/", { replace: true });
// //     return null;
// //   }

// //   const onSubmit = async (data: SignupFormData) => {
// //     setIsSubmitting(true);
// //     const { error } = await signUp(data.email, data.password);

// //     if (error) {
// //       toast({
// //         title: "Sign up failed",
// //         description: error.message || "Unable to create account. Please try again.",
// //         variant: "destructive",
// //       });
// //     } else {
// //       toast({
// //         title: "Account created!",
// //         description: "Your account has been successfully created. You can now sign in.",
// //       });
// //       navigate("/login", { replace: true });
// //     }
// //     setIsSubmitting(false);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50 p-4">
// //       <Card className="w-full max-w-md">
// //         <CardHeader className="space-y-1">
// //           <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
// //           <CardDescription className="text-center">
// //             Enter your information to create a new account
// //           </CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //             <div className="space-y-2">
// //               <Label htmlFor="email">Email</Label>
// //               <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="you@example.com"
// //                 {...register("email")}
// //                 disabled={isSubmitting}
// //               />
// //               {errors.email && (
// //                 <p className="text-sm text-destructive">{errors.email.message}</p>
// //               )}
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="password">Password</Label>
// //               <Input
// //                 id="password"
// //                 type="password"
// //                 placeholder="••••••••"
// //                 {...register("password")}
// //                 disabled={isSubmitting}
// //               />
// //               {errors.password && (
// //                 <p className="text-sm text-destructive">{errors.password.message}</p>
// //               )}
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="confirmPassword">Confirm Password</Label>
// //               <Input
// //                 id="confirmPassword"
// //                 type="password"
// //                 placeholder="••••••••"
// //                 {...register("confirmPassword")}
// //                 disabled={isSubmitting}
// //               />
// //               {errors.confirmPassword && (
// //                 <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
// //               )}
// //             </div>

// //             <Button
// //               type="submit"
// //               className="w-full bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
// //               disabled={isSubmitting || loading}
// //             >
// //               {isSubmitting || loading ? (
// //                 <>
// //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                   Creating account...
// //                 </>
// //               ) : (
// //                 "Create Account"
// //               )}
// //             </Button>
// //           </form>

// //           <div className="mt-4 text-center text-sm">
// //             <span className="text-muted-foreground">Already have an account? </span>
// //             <Link
// //               to="/login"
// //               className="text-primary hover:underline font-medium"
// //             >
// //               Sign in
// //             </Link>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthStore } from "@/stores/authStore";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "@/hooks/use-toast";
// import { Loader2 } from "lucide-react";

// const signupSchema = z.object({
//   email: z.string().email("Enter valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// type SignupFormData = z.infer<typeof signupSchema>;

// export default function Signup() {
//   const navigate = useNavigate();
//   const { signUp, loading, sendOtp, verifyOtp } = useAuthStore();

//   const [method, setMethod] = useState<"email" | "phone">("email");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // phone signup state
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = async (data: SignupFormData) => {
//     setIsSubmitting(true);
//     const { error } = await signUp(data.email, data.password);

//     if (error) {
//       toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
//     } else {
//       toast({ title: "Account Created", description: "Please log in!" });
//       navigate("/login", { replace: true });
//     }
//     setIsSubmitting(false);
//   };

//   const handleSendOtp = async () => {
//     setIsSubmitting(true);

//     const { error } = await sendOtp(phone);
//     if (error) {
//       toast({ title: "OTP Error", description: error.message, variant: "destructive" });
//     } else {
//       toast({ title: "OTP sent", description: "Check your SMS" });
//       setOtpSent(true);
//     }
//     setIsSubmitting(false);
//   };

//   const handleVerifyOtp = async () => {
//     setIsSubmitting(true);

//     const { error } = await verifyOtp(phone, otp);
//     if (error) {
//       toast({ title: "Verification Failed", description: error.message, variant: "destructive" });
//     } else {
//       toast({ title: "Phone Verified", description: "Signup Completed" });
//       navigate("/login", { replace: true });
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
//           <CardDescription className="text-center">
//             Choose signup method
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <div className="flex gap-3 mb-4">
//             <Button
//               variant={method === "email" ? "default" : "outline"}
//               onClick={() => setMethod("email")}
//               className="w-1/2"
//             >
//               Email
//             </Button>
//             <Button
//               variant={method === "phone" ? "default" : "outline"}
//               onClick={() => setMethod("phone")}
//               className="w-1/2"
//             >
//               Phone OTP
//             </Button>
//           </div>

//           {method === "email" && (
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Email</Label>
//                 <Input placeholder="you@example.com" {...register("email")} disabled={isSubmitting} />
//                 {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <Label>Password</Label>
//                 <Input type="password" placeholder="••••••" {...register("password")} disabled={isSubmitting} />
//                 {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <Label>Confirm Password</Label>
//                 <Input type="password" placeholder="••••••" {...register("confirmPassword")} disabled={isSubmitting} />
//                 {errors.confirmPassword && (
//                   <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
//                 )}
//               </div>

//               <Button className="w-full bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700">
//                 {isSubmitting || loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
//               </Button>
//             </form>
//           )}

//           {method === "phone" && (
//             <div className="space-y-4">
//               <Input placeholder="+91XXXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />

//               {!otpSent ? (
//                 <Button className="w-full" onClick={handleSendOtp}>
//                   {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send OTP"}
//                 </Button>
//               ) : (
//                 <>
//                   <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
//                   <Button className="w-full" onClick={handleVerifyOtp}>
//                     {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Signup"}
//                   </Button>
//                 </>
//               )}
//             </div>
//           )}

//           <div className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-primary hover:underline font-medium">
//               Sign in
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const signupSchema = z
  .object({
    email: z.string().email("auth.signup.validation.email"),
    password: z.string().min(6, "auth.signup.validation.passwordLength"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "auth.signup.validation.passwordMismatch",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const { signUp, loading, sendOtp, verifyOtp } = useAuthStore();
  const { t } = useTranslation();

  const [method, setMethod] = useState<"email" | "phone">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);

    const { error } = await signUp(data.email, data.password);
    if (error) {
      toast({
        title: t("auth.signup.toast.signupFailed"),
        description: error.message || t("auth.common.genericError"),
        variant: "destructive",
      });
    } else {
      toast({
        title: t("auth.signup.toast.accountCreated"),
        description: t("auth.signup.toast.loginPrompt"),
      });
      navigate("/login", { replace: true });
    }
    setIsSubmitting(false);
  };

  const handleSendOtp = async () => {
    setIsSubmitting(true);

    const { error } = await sendOtp(phone.trim());
    if (error) {
      toast({
        title: t("auth.signup.toast.otpError"),
        description: error.message || t("auth.common.genericError"),
        variant: "destructive",
      });
    } else {
      toast({
        title: t("auth.signup.toast.otpSent"),
        description: t("auth.signup.toast.otpSentDesc"),
      });
      setOtpSent(true);
    }
    setIsSubmitting(false);
  };

  const handleVerifyOtp = async () => {
    setIsSubmitting(true);

    const { error } = await verifyOtp(phone.trim(), otp.trim());
    if (error) {
      toast({
        title: t("auth.signup.toast.verificationFailed"),
        description: error.message || t("auth.common.genericError"),
        variant: "destructive",
      });
    } else {
      toast({
        title: t("auth.signup.toast.phoneVerified"),
        description: t("auth.signup.toast.signupCompleted"),
      });
      navigate("/dashboard", { replace: true });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("auth.signup.title")}</CardTitle>
          <CardDescription className="text-center">{t("auth.signup.subtitle")}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-3 mb-4">
            <Button
              variant={method === "email" ? "default" : "outline"}
              className="w-1/2"
              onClick={() => setMethod("email")}
            >
              {t("auth.signup.emailTab")}
            </Button>
            <Button
              variant={method === "phone" ? "default" : "outline"}
              className="w-1/2"
              onClick={() => setMethod("phone")}
            >
              {t("auth.signup.phoneTab")}
            </Button>
          </div>

          {method === "email" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>{t("auth.signup.emailLabel")}</Label>
                <Input
                  placeholder={t("auth.signup.emailPlaceholder")}
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{t(errors.email.message as string)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t("auth.signup.passwordLabel")}</Label>
                <Input
                  type="password"
                  placeholder={t("auth.signup.passwordPlaceholder")}
                  {...register("password")}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{t(errors.password.message as string)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t("auth.signup.confirmPasswordLabel")}</Label>
                <Input
                  type="password"
                  placeholder={t("auth.signup.confirmPasswordPlaceholder")}
                  {...register("confirmPassword")}
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {t(errors.confirmPassword.message as string)}
                  </p>
                )}
              </div>

              <Button className="w-full bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700">
                {isSubmitting || loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {t("auth.signup.createAccount")}
                  </>
                ) : (
                  t("auth.signup.createAccount")
                )}
              </Button>
            </form>
          )}

          {method === "phone" && (
            <div className="space-y-4">
              <Input
                placeholder={t("auth.signup.phonePlaceholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading || isSubmitting}
              />

              {!otpSent ? (
                <Button className="w-full" onClick={handleSendOtp} disabled={loading || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {t("auth.signup.sendOtp")}
                    </>
                  ) : (
                    t("auth.signup.sendOtp")
                  )}
                </Button>
              ) : (
                <>
                  <Input
                    placeholder={t("auth.signup.otpPlaceholder")}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={loading || isSubmitting}
                  />
                  <Button className="w-full" onClick={handleVerifyOtp} disabled={loading || isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        {t("auth.signup.verifyOtp")}
                      </>
                    ) : (
                      t("auth.signup.verifyOtp")
                    )}
                  </Button>
                </>
              )}
            </div>
          )}

          <div className="mt-4 text-center text-sm">
            {t("auth.signup.alreadyHaveAccount")}{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              {t("auth.signup.signIn")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
