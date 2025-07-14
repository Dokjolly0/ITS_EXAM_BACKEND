const date = new Date();
let year = date.getFullYear();

export const registrationEmailTemplate = (verificationLink: string) => `
<!DOCTYPE html>
            <html>
            <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>Verifica il tuo account Home Finance</title>
                <style>
                    body {{
                        font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
                        line-height: 1.6;
                        color: #374151;
                        background-color: #f9fafb;
                        margin: 0;
                        padding: 0;
                    }}
                    .container {{
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                        overflow: hidden;
                    }}
                    .header {{
                        background: linear-gradient(135deg, #6366f1, #4f46e5);
                        padding: 30px 20px;
                        text-align: center;
                        color: white;
                    }}
                    .logo {{
                        font-size: 24px;
                        font-weight: 700;
                        margin-bottom: 10px;
                    }}
                    .content {{
                        padding: 30px;
                    }}
                    h1 {{
                        color: #111827;
                        margin-top: 0;
                        font-size: 24px;
                    }}
                    .button-container {{
                        margin: 25px 0;
                        text-align: center;
                    }}
                    .button {{
                        display: inline-block;
                        padding: 12px 30px;
                        background-color: #4f46e5;
                        color: #ffffff !important;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        font-size: 16px;
                    }}
                    .footer {{
                        padding: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #6b7280;
                        border-top: 1px solid #e5e7eb;
                    }}
                    .code {{
                        font-family: monospace;
                        word-break: break-all;
                        color: #4f46e5;
                        background-color: #f5f3ff;
                        padding: 10px;
                        border-radius: 4px;
                        margin: 15px 0;
                    }}
                </style>
            </head>
            <body>
                <div class=""container"">
                    <div class=""header"">
                        <div class=""logo"">Node template</div>
                        <div>Email di verifica per Node template</div>
                    </div>
        
                    <div class=""content"">
                        <h1>Conferma il tuo indirizzo email</h1>
                        <p>Benvenuto in <strong>Node template</strong>! Per confermare la registrazione segui le istruzioni sottostanti</p>
            
                        <p>Per completare la registrazione, clicca sul pulsante qui sotto:</p>
            
                        <div class=""button-container"">
                            <a href=""${verificationLink}"" class=""button"">Verifica Email</a>
                        </div>
            
                        <p>Se il pulsante non funziona, copia e incolla questo URL nel tuo browser:</p>
                        <div class=""code"">${verificationLink}</div>
            
                        <p>Se non hai richiesto la creazione di un account, puoi ignorare questa email.</p>
            
                        <p>Grazie,<br>Il Team di <strong>Node template</strong></p>
                    </div>
        
                    <div class=""footer"">
                        <p>© ${year} Node template. Tutti i diritti riservati.</p>
                        <p>Questa email è stata inviata in risposta a una richiesta di registrazione sul nostro sito.</p>
                    </div>
                </div>
            </body>
            </html>
`;
