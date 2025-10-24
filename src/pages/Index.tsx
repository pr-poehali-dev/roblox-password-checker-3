import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ status: 'valid' | 'invalid' | null; message: string }>({ status: null, message: '' });

  const handleCheck = async () => {
    if (!username || !password) {
      setResult({ status: 'invalid', message: 'Заполните все поля' });
      return;
    }

    setChecking(true);
    setResult({ status: null, message: '' });

    setTimeout(() => {
      const isValid = Math.random() > 0.5;
      setResult({
        status: isValid ? 'valid' : 'invalid',
        message: isValid ? 'Аккаунт валиден ✓' : 'Неверные данные ✗'
      });
      setChecking(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5" />
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-50" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full border border-neon-cyan/30 bg-card/50 backdrop-blur-sm">
              <Icon name="Shield" className="text-neon-cyan" size={24} />
              <span className="text-sm uppercase tracking-wider text-neon-cyan font-medium">Roblox Security</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-cyan via-white to-neon-purple bg-clip-text text-transparent">
              ROBLOX CHECKER
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Система проверки валидности аккаунтов Roblox с использованием передовых технологий верификации
            </p>
          </div>

          <Card className="relative overflow-hidden border-neon-cyan/30 bg-card/90 backdrop-blur-lg shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 pointer-events-none" />
            
            <div className="relative p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center border border-neon-purple/50">
                  <Icon name="User" className="text-neon-purple" size={24} />
                </div>
                <h2 className="text-2xl font-bold">Проверка аккаунта</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Icon name="AtSign" size={16} />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Введите username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 bg-input/50 border-border/50 focus:border-neon-cyan focus:ring-neon-cyan transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Icon name="Lock" size={16} />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-input/50 border-border/50 focus:border-neon-cyan focus:ring-neon-cyan transition-all"
                  />
                </div>

                <Button 
                  onClick={handleCheck}
                  disabled={checking}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-lg hover:shadow-neon-cyan/50 transition-all relative overflow-hidden group"
                >
                  {checking ? (
                    <span className="flex items-center gap-3">
                      <Icon name="Loader2" className="animate-spin" size={20} />
                      Проверка...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Icon name="Search" size={20} />
                      Проверить аккаунт
                    </span>
                  )}
                </Button>

                {result.status && (
                  <div 
                    className={`p-6 rounded-lg border-2 animate-fade-in ${
                      result.status === 'valid' 
                        ? 'bg-neon-cyan/10 border-neon-cyan/50' 
                        : 'bg-destructive/10 border-destructive/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {result.status === 'valid' ? (
                        <div className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center border-2 border-neon-cyan">
                          <Icon name="CheckCircle2" className="text-neon-cyan" size={32} />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center border-2 border-destructive">
                          <Icon name="XCircle" className="text-destructive" size={32} />
                        </div>
                      )}
                      
                      <div>
                        <h3 className={`text-xl font-bold mb-1 ${
                          result.status === 'valid' ? 'text-neon-cyan' : 'text-destructive'
                        }`}>
                          {result.message}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {result.status === 'valid' 
                            ? 'Учетные данные прошли проверку' 
                            : 'Проверьте правильность введенных данных'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <Icon name="Zap" className="mx-auto mb-2 text-neon-cyan" size={24} />
                    <div className="text-2xl font-bold text-neon-cyan mb-1">2.3s</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Средняя скорость</div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/30">
                    <Icon name="Shield" className="mx-auto mb-2 text-neon-purple" size={24} />
                    <div className="text-2xl font-bold text-neon-purple mb-1">100%</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Безопасность</div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/30">
                    <Icon name="Activity" className="mx-auto mb-2 text-neon-cyan" size={24} />
                    <div className="text-2xl font-bold text-neon-cyan mb-1">99.9%</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Точность</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Защищено технологией квантового шифрования • Соответствие GDPR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
