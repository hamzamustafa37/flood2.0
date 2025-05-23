interface EmailDetails {
  [key: string]: string | number;
}
const url = process.env.NEXT_LOGIN_URL || "https://example.com";

export const emailTemplate = (
  title: string,
  content: string,
  details: EmailDetails,
  isButton: boolean = false,
  jobLink?: string,
  buttonName: string = "View Booking",
  user: boolean = false
) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" 
            style="background-color: #f5f5f5; margin: 0; padding: 20px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
                        style="background-color: #ffffff; border-radius: 5px; padding: 20px;">
                        
                        <!-- Logo -->
                        <tr>
                            <td align="center">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td align="left">
                                            <img src="https://firebasestorage.googleapis.com/v0/b/ftms-ca85b.appspot.com/o/logo%2Flogoo.png?alt=media&token=b04e115a-a296-4947-b243-7cbd99bef67f" 
                                                 alt="The Flood Team Logo" 
                                                 style="max-width: 250px;" />
                                        </td>
                                        ${
                                          !user
                                            ? `
                                        <td align="right">
                                            <a href="${url}/login" 
                                                style="display: inline-block; padding: 12px 24px; 
                                                background-color: #007bff; color: #ffffff; 
                                                text-decoration: none; font-size: 16px; 
                                                font-weight: bold; border-radius: 6px; 
                                                transition: background 0.3s ease; 
                                                text-align: center;">
                                                App Login
                                            </a>
                                        </td>`
                                            : ""
                                        }
                                    </tr>
                                </table>
                            </td>
                        </tr>
    
                        <!-- Title -->
                        <tr>
                            <td align="center">
                                <h1 style="font-size: 24px; color: #000000;">${title}</h1>
                            </td>
                        </tr>
    
                        <!-- Content -->
                        <tr>
                            <td align="center">
                                <p style="font-size: 16px; line-height: 1.5; color: #333333;">${content}</p>
                            </td>
                        </tr>
  
                        ${
                          isButton && jobLink
                            ? `
                        <tr>
                            <td align="center">
                                <a href="${jobLink}" 
                                   style="display: inline-block; background-color: #2474b5; 
                                   color: white; padding: 12px 40px; 
                                   text-decoration: none; border-radius: 4px;
                                   font-weight: bold; margin-top: 20px;">
                                   ${buttonName}
                                </a>
                            </td>
                        </tr>`
                            : ""
                        }
  
                        <!-- Details Box -->
                        <tr>
                            <td>
                                <div style="text-align: left; padding: 10px; border: 1px solid #ddd; 
                                    border-radius: 5px; background-color: #f9f9f9; margin-top: 20px;">
                                    ${
                                      details && typeof details === "object"
                                        ? Object.entries(details)
                                            .map(
                                              ([key, value]) => `
                                                <p style="margin: 8px 0; font-size: 16px; color: #333;">
                                                  <strong style="color: #000;">${key}:</strong> ${value}
                                                </p>`
                                            )
                                            .join("")
                                        : ""
                                    }
                                </div>
                            </td>
                        </tr>
    
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
};

export const EmployeeTemplate = (
  customerName: any,
  causeOfDamage: any,
  plumbingIssue: any,
  address: any,
  city: any,
  zipCode: any,
  jobLink: any,
  type = "normal"
) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Job Assignment</title>
</head>
<body style="background-color: #f5f5f5; margin: 0; 
padding: 0; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0"
     cellpadding="0" border="0" style="background-color: #f5f5f5;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" 
                cellpadding="0" border="0" style="background-color: #ffffff; 
                border-radius: 5px; padding: 20px; margin-top: 20px;">
                    <!-- Header with logo and login button -->
       <tr>
    <td align="center" style="padding-top: 10px;">
        <table role="presentation" width="100%" 
        cellspacing="0" cellpadding="0" border="0">
            <tr>
                <td align="left">
                    <img src="https://firebasestorage.googleapis.com/v0/b/ftms-ca85b.appspot.com/o/logo%2Flogoo.png?alt=media&token=b04e115a-a296-4947-b243-7cbd99bef67f" 
                         alt="The Flood Team Logo" 
                         style="max-width: 250px;" />
                </td>
                <td align="right">
                    <a href="${url}/login" 
                        style="display: inline-block; 
                        padding: 12px 24px; 
                        background-color: #007bff; 
                        color: #ffffff; 
                        text-decoration: none; 
                        font-size: 16px; 
                        font-weight: bold; 
                        border-radius: 6px; 
                        transition: background 0.3s ease; 
                        text-align: center;">
                        App Login
                    </a>
                </td>
            </tr>
        </table>
    </td>
</tr>


                    <!-- Content Section -->
                    <tr>
                        <td align="center" style="padding: 30px;">
                            <h1 style="font-size: 24px; color: ${type === "normal" ? "##000000" : "#FF0000"};
                            margin-bottom: 20px;">
                            ${
                              type === "normal"
                                ? `You've been 
                            assigned to a new job booking!`
                                : `An Emergency booking has arrived ⚠️`
                            }</h1>
                            <p style="font-size: 16px; color: #333333; 
                            line-height: 1.5; margin-bottom: 20px;">
                            Confirm to accept the job below.</p>

                            <!-- Job Details Table -->
                            <table role="presentation" width="100%" 
                            cellspacing="0" cellpadding="10" border="0"
                             style="background-color: #f9f9f9;
                              border-radius: 5px; padding: 10px;
                               margin-bottom: 20px;">
                                <tr>
                                    <td align="left" style="font-size: 16px;
                                     color: #333333;">
                                     <strong>Name:</strong></td>
                                    <td align="left" style="font-size: 16px; 
                                    color: #333333;">${customerName}</td>
                                </tr>
                                <tr>
                                    <td align="left" style="font-size: 16px;
                                     color: #333333;"><strong>Cause of Loss:
                                     </strong></td>
                                    <td align="left" style="font-size: 16px;
                                    color: #333333;">
                                        ${
                                          causeOfDamage && plumbingIssue
                                            ? `${causeOfDamage} - ${plumbingIssue}`
                                            : causeOfDamage
                                              ? causeOfDamage
                                              : plumbingIssue
                                                ? plumbingIssue
                                                : ""
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="font-size: 16px; 
                                    color: #333333;"><strong>Location:
                                    </strong></td>
                                    <td align="left" style="font-size: 16px;
                                     color: #333333;">${address}, ${city}, 
                                     ${zipCode}</td>
                                </tr>
                            </table>

                            <p style="font-size: 14px; color: #333333;
                             margin-top: 20px;">
                                If you fail to respond within 5
                                 minutes of receiving this email, 
                                you may lose the job booking 
                                to technicians on deck.
                            </p>

                            <a href="${jobLink}" 
                              style="display: inline-block; 
                              background-color: ${type === "normal" ? "#2474b5" : "#FF0000"}; 
                              color: white; 
                              padding: 12px 40px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-weight: bold; 
                              margin-top: 20px;">
                            ${type === "normal" ? `View Booking` : `Emergency Booking`}
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
