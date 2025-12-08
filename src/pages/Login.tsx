// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { z } from "zod";
// // import { Link, useNavigate, useSearchParams } from "react-router-dom";
// // import { useAuthStore } from "@/stores/authStore";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { toast } from "@/hooks/use-toast";
// // import { Loader2 } from "lucide-react";

// // const loginSchema = z.object({
// //   email: z.string().email("Please enter a valid email address"),
// //   password: z.string().min(6, "Password must be at least 6 characters"),
// // });

// // type LoginFormData = z.infer<typeof loginSchema>;

// // export default function Login() {
// //   const [searchParams] = useSearchParams();
// //   const navigate = useNavigate();
// //   const { signIn, loading, user } = useAuthStore();
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm<LoginFormData>({
// //     resolver: zodResolver(loginSchema),
// //   });

// //   // Redirect if already authenticated
// //   if (user && !loading) {
// //     const returnTo = searchParams.get("returnTo") || "/";
// //     navigate(returnTo, { replace: true });
// //     return null;
// //   }

// //   const onSubmit = async (data: LoginFormData) => {
// //     setIsSubmitting(true);
// //     const { error } = await signIn(data.email, data.password);

// //     if (error) {
// //       toast({
// //         title: "Login failed",
// //         description: error.message || "Invalid email or password",
// //         variant: "destructive",
// //       });
// //     } else {
// //       toast({
// //         title: "Welcome back!",
// //         description: "You have been successfully logged in.",
// //       });
// //       const returnTo = searchParams.get("returnTo") || "/";
// //       navigate(returnTo, { replace: true });
// //     }
// //     setIsSubmitting(false);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50 p-4">
// //       <Card className="w-full max-w-md">
// //         <CardHeader className="space-y-1">
// //           <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
// //           <CardDescription className="text-center">
// //             Enter your email and password to access your account
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

// //             <Button
// //               type="submit"
// //               className="w-full bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
// //               disabled={isSubmitting || loading}
// //             >
// //               {isSubmitting || loading ? (
// //                 <>
// //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                   Signing in...
// //                 </>
// //               ) : (
// //                 "Sign In"
// //               )}
// //             </Button>
// //           </form>

// //           <div className="mt-4 text-center text-sm">
// //             <span className="text-muted-foreground">Don't have an account? </span>
// //             <Link
// //               to="/signup"
// //               className="text-primary hover:underline font-medium"
// //             >
// //               Sign up
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
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { useAuthStore } from "@/stores/authStore";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "@/hooks/use-toast";
// import { Loader2 } from "lucide-react";

// const loginSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// export default function Login() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const { signIn, loading, sendOtp, verifyOtp } = useAuthStore();

//   const [method, setMethod] = useState<"email" | "phone">("email");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // phone login states
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     setIsSubmitting(true);
//     const { error } = await signIn(data.email, data.password);

//     if (error) {
//       toast({
//         title: "Login failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       toast({ title: "Welcome back!" });
//       navigate(searchParams.get("returnTo") || "/", { replace: true });
//     }
//     setIsSubmitting(false);
//   };

//   const handleSendOtp = async () => {
//     setIsSubmitting(true);
//     const { error } = await sendOtp(phone);

//     if (error) {
//       toast({ title: "OTP Error", description: error.message, variant: "destructive" });
//     } else {
//       toast({ title: "OTP Sent", description: "Check your phone" });
//       setOtpSent(true);
//     }
//     setIsSubmitting(false);
//   };

//   const handleVerifyOtp = async () => {
//     setIsSubmitting(true);
//     const { error } = await verifyOtp(phone, otp);

//     if (error) {
//       toast({ title: "Verification failed", description: error.message, variant: "destructive" });
//     } else {
//       toast({ title: "Phone Verified", description: "Welcome!" });
//       navigate(searchParams.get("returnTo") || "/", { replace: true });
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
//           <CardDescription className="text-center">
//             Choose login method
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
//                 <Input {...register("email")} placeholder="you@example.com" disabled={isSubmitting} />
//                 {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <Label>Password</Label>
//                 <Input type="password" placeholder="••••••••" {...register("password")} disabled={isSubmitting} />
//                 {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
//               >
//                 {isSubmitting || loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
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
//                     {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Login"}
//                   </Button>
//                 </>
//               )}
//             </div>
//           )}

//           <div className="mt-4 text-center text-sm">
//             <span className="text-muted-foreground">Don’t have an account? </span>
//             <Link to="/signup" className="text-primary hover:underline font-medium">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { signIn, loading, sendOtp, verifyOtp } = useAuthStore();

  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailLogin = async () => {
    setIsSubmitting(true);

    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome Back!" });
      navigate("/dashboard", { replace: true });
    }

    setIsSubmitting(false);
  };

  const handleSendOtp = async () => {
    setIsSubmitting(true);

    const { error } = await sendOtp(phone.trim());
    if (error) {
      toast({ title: "OTP Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "OTP sent", description: "Check your phone" });
      setOtpSent(true);
    }

    setIsSubmitting(false);
  };

  const handleVerifyOtp = async () => {
    setIsSubmitting(true);

    const { error } = await verifyOtp(phone.trim(), otp.trim());
    if (error) {
      toast({ title: "Verification Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Login Successful" });
      navigate("/dashboard", { replace: true });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Login to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-3 mb-4">
            <Button variant={method === "email" ? "default" : "outline"} className="w-1/2"
              onClick={() => setMethod("email")}>Email</Button>
            <Button variant={method === "phone" ? "default" : "outline"} className="w-1/2"
              onClick={() => setMethod("phone")}>Phone OTP</Button>
          </div>

          {method === "email" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input placeholder="you@example.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} />
              </div>

              <Button className="w-full" onClick={handleEmailLogin} disabled={isSubmitting || loading}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>
            </div>
          )}

          {method === "phone" && (
            <div className="space-y-4">
              <Input placeholder="+91XXXXXXXXXX" value={phone}
                onChange={(e) => setPhone(e.target.value)} disabled={isSubmitting} />

              {!otpSent ? (
                <Button className="w-full" onClick={handleSendOtp} disabled={loading || isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send OTP"}
                </Button>
              ) : (
                <>
                  <Input placeholder="Enter OTP" value={otp}
                    onChange={(e) => setOtp(e.target.value)} disabled={isSubmitting} />

                  <Button className="w-full" onClick={handleVerifyOtp}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Login"}
                  </Button>
                </>
              )}
            </div>
          )}

          <div className="mt-4 text-center text-sm">
            New here?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Create Account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}