const ComponentSkeleton = ({ type = 'default' }: { type?: 'default' | 'hero' | 'card' | 'footer' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="w-full min-h-screen flex items-center justify-center bg-primary">
            <div className="text-center space-y-6 px-4">
              <div className="w-64 h-8 bg-accent/20 rounded-lg animate-pulse mx-auto"></div>
              <div className="w-96 h-4 bg-foreground/20 rounded animate-pulse mx-auto"></div>
              <div className="w-80 h-4 bg-foreground/20 rounded animate-pulse mx-auto"></div>
              <div className="flex gap-4 justify-center mt-8">
                <div className="w-32 h-12 bg-accent/30 rounded-lg animate-pulse"></div>
                <div className="w-32 h-12 bg-foreground/20 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        );
      
      case 'card':
        return (
          <div className="w-full py-20 bg-primary">
            <div className="max-w-7xl mx-auto px-4 space-y-8">
              <div className="text-center space-y-4">
                <div className="w-64 h-8 bg-accent/20 rounded-lg animate-pulse mx-auto"></div>
                <div className="w-96 h-4 bg-foreground/20 rounded animate-pulse mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-primary/20 border border-accent/10 rounded-xl p-6 space-y-4">
                    <div className="w-full h-32 bg-accent/10 rounded-lg animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-foreground/20 rounded animate-pulse"></div>
                    <div className="w-full h-3 bg-foreground/10 rounded animate-pulse"></div>
                    <div className="w-2/3 h-3 bg-foreground/10 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'footer':
        return (
          <div className="w-full bg-gradient-to-b from-primary to-secondary border-t border-accent/20 py-16">
            <div className="max-w-7xl mx-auto px-4 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-foreground/20 rounded animate-pulse"></div>
                      <div className="w-48 h-3 bg-foreground/10 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-foreground/10 rounded animate-pulse"></div>
                    <div className="w-3/4 h-3 bg-foreground/10 rounded animate-pulse"></div>
                  </div>
                  <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-10 h-10 bg-accent/20 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                </div>
                
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-24 h-4 bg-foreground/20 rounded animate-pulse"></div>
                    <div className="space-y-2">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="w-3/4 h-3 bg-foreground/10 rounded animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full py-20 bg-primary">
            <div className="max-w-7xl mx-auto px-4 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-48 h-6 bg-accent/20 rounded-lg animate-pulse mx-auto"></div>
                <div className="w-80 h-4 bg-foreground/20 rounded animate-pulse mx-auto"></div>
                <div className="w-64 h-4 bg-foreground/20 rounded animate-pulse mx-auto"></div>
              </div>
              
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-full h-20 bg-primary/20 border border-accent/10 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="animate-pulse">
      {renderSkeleton()}
    </div>
  );
};

export default ComponentSkeleton;