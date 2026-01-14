import { Monitor } from 'lucide-react';

export const MobileBlocker = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background p-8 lg:hidden z-50">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center">
          <Monitor className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Desktop Only</h1>
        <p className="text-foreground/70 leading-relaxed">
          This weather application is optimized for desktop viewing. 
          Please open it on a device with a screen width of at least 1024px for the best experience.
        </p>
      </div>
    </div>
  );
};
