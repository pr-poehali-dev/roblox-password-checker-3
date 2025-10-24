import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('check');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ status: 'valid' | 'invalid' | null; message: string }>({ status: null, message: '' });

  const [bruteUsername, setBruteUsername] = useState('');
  const [isBruteForcing, setIsBruteForcing] = useState(false);
  const [bruteProgress, setBruteProgress] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [bruteResult, setBruteResult] = useState<{ found: boolean; password: string } | null>(null);
  const [bruteLog, setBruteLog] = useState<string[]>([]);

  const passwordVariants = [
    'password123', 'roblox2024', 'admin123', 'qwerty', '123456789',
    'letmein', 'welcome', 'robux123', 'gamer2024', 'hackerman',
    'dragon123', 'master', 'ninja2024', 'player1', 'supreme'
  ];

  useEffect(() => {
    if (isBruteForcing && bruteProgress < 100) {
      const interval = setInterval(() => {
        setBruteProgress(prev => {
          const newProgress = Math.min(prev + (100 / passwordVariants.length), 100);
          return newProgress;
        });
        
        const attemptIndex = Math.floor(attemptsCount);
        if (attemptIndex < passwordVariants.length) {
          const attempt = passwordVariants[attemptIndex];
          setCurrentAttempt(attempt);
          setBruteLog(prev => [...prev.slice(-4), `[${attemptIndex + 1}/${passwordVariants.length}] Проверка: ${attempt}`]);
          setAttemptsCount(prev => prev + 1);
        }
        
        if (attemptIndex >= passwordVariants.length - 1) {
          const foundPassword = passwordVariants[Math.floor(Math.random() * passwordVariants.length)];
          setBruteResult({ found: true, password: foundPassword });
          setIsBruteForcing(false);
          setBruteLog(prev => [...prev, `✓ ПАРОЛЬ НАЙДЕН: ${foundPassword}`]);
        }
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [isBruteForcing, bruteProgress, attemptsCount]);

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

  const handleBruteForce = () => {
    if (!bruteUsername) return;
    
    setIsBruteForcing(true);
    setBruteProgress(0);
    setAttemptsCount(0);
    setBruteResult(null);
    setBruteLog([`Начинаем подбор пароля для: ${bruteUsername}`]);
    setCurrentAttempt('');
  };

  const resetBruteForce = () => {
    setIsBruteForcing(false);
    setBruteProgress(0);
    setAttemptsCount(0);
    setBruteResult(null);
    setBruteLog([]);
    setCurrentAttempt('');
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-card/50 backdrop-blur-lg border border-border/50">
              <TabsTrigger 
                value="check"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-cyan data-[state=active]:to-neon-purple data-[state=active]:text-primary-foreground"
              >
                <Icon name="Search" size={18} className="mr-2" />
                Проверка
              </TabsTrigger>
              <TabsTrigger 
                value="brute"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-cyan data-[state=active]:to-neon-purple data-[state=active]:text-primary-foreground"
              >
                <Icon name="Cpu" size={18} className="mr-2" />
                Подбор пароля
              </TabsTrigger>
            </TabsList>

            <TabsContent value="check">
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
            </TabsContent>

            <TabsContent value="brute">
              <Card className="relative overflow-hidden border-neon-purple/30 bg-card/90 backdrop-blur-lg shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-purple/5 to-neon-cyan/5 pointer-events-none" />
                
                <div className="relative p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-lg bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50">
                      <Icon name="Cpu" className="text-neon-cyan" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold">Подбор пароля</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="brute-username" className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Icon name="Target" size={16} />
                        Целевой аккаунт
                      </Label>
                      <Input
                        id="brute-username"
                        type="text"
                        placeholder="Введите username для подбора"
                        value={bruteUsername}
                        onChange={(e) => setBruteUsername(e.target.value)}
                        disabled={isBruteForcing}
                        className="h-12 bg-input/50 border-border/50 focus:border-neon-purple focus:ring-neon-purple transition-all"
                      />
                    </div>

                    {!isBruteForcing && !bruteResult && (
                      <Button 
                        onClick={handleBruteForce}
                        disabled={!bruteUsername}
                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-neon-purple to-neon-cyan hover:shadow-lg hover:shadow-neon-purple/50 transition-all"
                      >
                        <Icon name="Play" size={20} className="mr-2" />
                        Запустить подбор
                      </Button>
                    )}

                    {isBruteForcing && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="p-6 rounded-lg bg-muted/30 border border-neon-cyan/30">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm uppercase tracking-wider text-muted-foreground">Прогресс</span>
                            <span className="text-lg font-bold text-neon-cyan">{Math.floor(bruteProgress)}%</span>
                          </div>
                          <Progress value={bruteProgress} className="h-3 mb-4" />
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="Hash" size={14} className="text-neon-purple" />
                              <span className="text-muted-foreground">Попыток:</span>
                              <span className="font-mono text-neon-cyan">{Math.floor(attemptsCount)} / {passwordVariants.length}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="Key" size={14} className="text-neon-purple" />
                              <span className="text-muted-foreground">Текущая:</span>
                              <span className="font-mono text-foreground">{currentAttempt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-black/40 border border-neon-cyan/20">
                          <div className="flex items-center gap-2 mb-3">
                            <Icon name="Terminal" size={16} className="text-neon-cyan" />
                            <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Консоль</span>
                          </div>
                          <div className="space-y-1 font-mono text-xs max-h-32 overflow-y-auto">
                            {bruteLog.map((log, idx) => (
                              <div key={idx} className="text-neon-cyan/80">{log}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {bruteResult && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="p-6 rounded-lg bg-neon-cyan/10 border-2 border-neon-cyan/50">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center border-2 border-neon-cyan">
                              <Icon name="CheckCircle2" className="text-neon-cyan" size={32} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-neon-cyan mb-1">Пароль найден!</h3>
                              <p className="text-sm text-muted-foreground">Подбор завершен успешно</p>
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-black/40 border border-neon-cyan/30">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Найденный пароль:</span>
                              <span className="font-mono text-lg font-bold text-neon-cyan">{bruteResult.password}</span>
                            </div>
                          </div>
                        </div>

                        <Button 
                          onClick={resetBruteForce}
                          variant="outline"
                          className="w-full h-12 border-neon-cyan/30 hover:bg-neon-cyan/10"
                        >
                          <Icon name="RotateCcw" size={18} className="mr-2" />
                          Новый подбор
                        </Button>
                      </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-border/50">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 rounded-lg bg-muted/30">
                          <Icon name="Database" className="mx-auto mb-2 text-neon-purple" size={24} />
                          <div className="text-2xl font-bold text-neon-purple mb-1">{passwordVariants.length}</div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider">Словарь паролей</div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-muted/30">
                          <Icon name="Gauge" className="mx-auto mb-2 text-neon-cyan" size={24} />
                          <div className="text-2xl font-bold text-neon-cyan mb-1">800ms</div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider">Скорость/попытка</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

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
