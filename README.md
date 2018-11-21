# wraps-logger
_Work in progress!!_

Winston wrapping function for logging

## Installation
`npm install wraps-logger`

## Usage
### Default logger
```typescript
import { logger } from 'wraps-logger'
logger.error('Error');
logger.warn('Warning');
logger.info('Info');
logger.debug('Debug');
```

### Adding custom namespaces
```typescript
import { createNamespace } from 'wraps-logger';
const myLogger = createNamespace('MYNAMESPACE', {level: debug});
myLogger.debug('Hello world!');
```

