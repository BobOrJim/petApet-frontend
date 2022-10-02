####################################### USER #######################################

SELECT top 100 *
FROM [dbo].[User]
WHERE Alias = '';

UPDATE [dbo].[User]
SET Alias = 'BanjoAlias'
WHERE Id = '1E13B2A2-8F48-4347-54F5-08DAA38FCB9C';

UPDATE [dbo].[User]
SET [ContactEmail] = 'banjo@email.com'
WHERE Id = '1E13B2A2-8F48-4347-54F5-08DAA38FCB9C';

UPDATE [dbo].[User]
SET Alias = 'JanBannanAlias'
WHERE Id = 'A0D98245-4018-41BD-E868-08DAA3355985';

UPDATE [dbo].[User]
SET [ContactEmail] = 'bannan@email.com'
WHERE Id = 'A0D98245-4018-41BD-E868-08DAA3355985';

####################################### ADVERT #######################################

SELECT top 100 *
FROM [dbo].[Advert]

UPDATE [dbo].[Advert]
SET Grade = 4
WHERE Id = '08A79BF8-7C3F-431F-C6F5-08DAA33559A2'

