const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100%] bg-[#f7f7f7] flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
