<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# NestJS

# Introduction

- 타입스크립트를 fully support
- OOP, FP, Funcational Reactive Programming과도 결합할 수 있음.
- NestJS는 내부적으로 Express(디폴트), Fastify 와 같은 HTTP server framework를 사용함.

## Philosophy

- 많은 Node를 위한 라이브러리, 툴들이 있지만, 그 어떤것도 **구조**에 대한 문제를 해결해주지 않음.
    - 이 라이브러리들은 구조 설계에 있어서, 자유도가 높음.
- NestJS는 testable, scalable, loosely coupled, maintainable 애플리케이션을 작성할 수 있게 해주는 애플리케이션 구조를 제공함
- NestJS의 구조는 Angular로부터 영감을 받음.


# Core Fundamentals

## Language
- 타입스크립트와 자바스크립트 모두 가능
    - 자바스크립트 사용하려면, 바벨 설정이 필요

## 폴더구조

```
src
ㄴapp.controller.spec.ts
ㄴapp.controller.ts
ㄴapp.module.ts
ㄴapp.service.ts
ㄴmain.ts
```
- core file 
    - app.controller.ts : basic controller
    - app.controller.spec.ts : 컨트롤러의 유닛 테스트
    - app.module.ts : 애플리케이션의 루트 모듈
    - app.service.ts : basic service
    - main.ts : entry file. `NestFactory`라는 함수를 사용하여, Nest application 인스턴스를 만듦.

- 각 모듈이 각각의 폴더 안에 있도록 하는 컨벤션을 따르게 한다.

### main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

- `NestFactory` 클래스를 사용하여 Nest application 인스턴스를 만들 수 있음.
- 이 클래스에서 제공하는 여러 static method로 애플리케이션 인스턴스를 만듦.
- `create()` 메소드 : application object를 반환. 이 object는 `INestApplication` 인터페이스를 만족함.

## Platform

- 기술적으로는 apater가 생성되면, 어떠한 node HTTP 프레임워크도 사용할 수 있음.
- Nest에서 바로 지원하고 있는 HTTP 플랫폼은 Express와 Fastify임.

# ⚙️ 컨트롤러

![](https://i.imgur.com/MUFF0PQ.png)

## 역할
- 컨트롤러는 들어오는 **요청과** 클라이언트에게 반환하는 **응답**을 처리한다.
- **라우팅** 메커니즘이 어떠한 컨트롤러가 어떤 요청을 받을 것인지를 조절한다. 
- 각 컨트롤러는 하나 이상의 라우트를 갖고 있고, 다른 라우트는 다른 액션을 수행한다.
- basic controller를 만들기 위해서 **클래스와 데코레이터**를 사용한다.

## 라우팅

- `@Controller()` 데코레이터를 사용하여, 컨트롤러를 정의할 수 있다. 
- `/customers`라는 라우트를 만들고자 한다면, `@Controller('customers')`처럼, 데코레이터안에 prefix를 정의하면 된다. 
- cats.controller.ts
    ```typescript

    import { Controller, Get } from '@nestjs/common';

    @Controller('cats')
    export class CatsController {
      @Get()
      findAll(): string {
        return 'This action returns all cats';
      }
    }
    ```
    
- `@Get()` HTTP 요청 메소드 데코레이터는, `GET /cats` 요청에 대한 핸들러가 `findAll()`메소드임을 Nest에게 알려준다.
- 컨트롤러 path prefix에 path를 붙이고 싶다면, 데코레이터에 정의하면 된다.
    - `@Get('profile')` 데코레이터는 `GET /customers/profile` 요청에 대한 핸들러를 매핑하게 한다. 


## 응답

Nest에서는 응답을 위한 두 가지 옵션이 주어진다.

### Standard (추천)
- 핸들러가 object나 array를 반환하면, **자동으로** JSON으로 바꿔준다.
- 핸들러가 primitive type을 반환하면, 그 값 그대로 보낸다.
- 응답 코드는 200이 디폴트이고, POST 메소드에서는 201이 디폴트값이다. 
- 응답코드는 `@HttpCode()` 데코레이터를 사용하여 설정할 수 있다.

```typescript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

### Library-specific

- `@Res()` 데코레이터를 사용하여, 라이브러리의 response object를 사용할 수 있다.
- Express를 예로 들면, response.status(200).send()로 response를 구성할 수 있다.
- 이 모드를 사용하면, response에 대해서 직접 관리를 해주어야 한다. 


## 요청 객체 (Request Object)
- cats.controller.tsJS
```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```


- `@Req()` 데코레이터를 사용하여, 요청 객체에 접근할 수 있다. 
- 요청 객체에는 query string, parameter, HTTP header, body 등에 대한 프로퍼티가 담겨 있다. 
    - 이 프로퍼티들에 대한 것도 데코레이터를 사용하여 접근할 수 있따. 
    - 예) `@Body(key?:string)` : req.body / req.body[key]

# ⚙️ Provider

![](https://i.imgur.com/9eaH4Ye.png)

- Nest의 기본 클래스들이 provider로 취급된다. - service, repositories, factories, helpers, 등등
- Provider의 주요 개념은 **의존성을 주입**한다는 것이다. 
    - 의존성을 주입함으로써, 객체들은 다른 객체들과 여러 관계를 맺을 수 있다.

- 컨트롤러가 HTTP 요청을 받는 역할을 하고, 더 복잡한 작업은 Provider에게 위임하게 된다. 
- 프로바이더는 module에서 `providers`로 정의하는 plain Javascript class이다.

## Service

- cats.service.ts
    ```typescript
    import { Injectable } from '@nestjs/common';
    import { Cat } from './interfaces/cat.interface';

    @Injectable()
    export class CatsService {
      private readonly cats: Cat[] = [];

      create(cat: Cat) {
        this.cats.push(cat);
      }

      findAll(): Cat[] {
        return this.cats;
      }
    }
    ```
    
- 서비스는 **데이터를 저장하고, 꺼내는 것**에 대한 책임이 있다. 
- 서비스는 컨트롤러에서 사용하게 된다.
- `@Injectable()` 데코레이터는 CatService 클래스가 Nest IoC 컨테이너에 의해 관리된다는 것을 선언하는 메타데이터를 붙이게 된다. 

이 서비스에서 Cat interface를 사용하고 있는데, 이는 `./interfaces/cat.interface.ts`에 정의하도록 한다.

이렇게 만든 서비스를 컨트롤러에서 사용하도록 해보자.

- cats.controller.ts

    ```typescript
    import { Controller, Get, Post, Body } from '@nestjs/common';
    import { CreateCatDto } from './dto/create-cat.dto';
    import { CatsService } from './cats.service';
    import { Cat } from './interfaces/cat.interface';

    @Controller('cats')
    export class CatsController {
      constructor(private catsService: CatsService) {}

      @Post()
      async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
      }

      @Get()
      async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
      }
    }
    ```
CatsService는 class constructor로 주입되었다. `private` 를 위와 같이 사용하면, catsService 멤버를 같은 위치에서 즉시, 선언하고 초기화까지 할 수 있게 된다. \


## 의존성 주입

```typescript
constructor(private catsService: CatsService) {}
```

💡**Nest는 의존성 주입이라는 디자인 패턴을 사용하여 만들어졌다.** 
이 개념에 관련하여 [앵귤러의 공식문서](https://angular.io/guide/dependency-injection)를 읽어보는 것을 추천한다.

## Provider 등록

- app.module.ts

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

 # 모듈 Modules
 
 ![](https://i.imgur.com/FAVvH9P.png)

 
- 모듈은 `@Module()` 데코레이터를 사용하는 클래스이다.

## @Module() 데코레이터

- 이 데코레이터는 Nest에게 애플리케이션 구조를 만들 때 사용하는 메타데이터를 제공한다.
- 애플리케이션은 **Root Module**을 갖고 있다. 이 루트 모듈이 Nest가 **application graph**를 만들 때의 시작점이 된다. 
    - application graph : Nest가 모듈과 provider의 관계와 의존성을 해결할 때 사용하는 내부 데이터구조이다.
- Nest는 모듈이 컴포넌트를 구성하는 효과적인 방법이며, 애플리케이션 구조는 여러 모듈을 사용하는 형태가 될 것이라고 한다. 
- 이 데코레이터는 이 모듈을 설명하는 프로퍼티를 갖는 하나의 객체를 받는다.
    - providers  : Nest injector에 의해 인스턴스화 되는 프로바이더들. 프로바이더는 여러 모듈에 의해 공유될 수 있다. 
    - controllers : set of controllers 
    - imports : provider를 export하는 모듈들의 리스트
    - exports : subset of providers. 

## Feature Modules
- feature module은 특정한 기능과 관련있는 코드들을 구성한다.

CatsController와 CatsService는 같은 애플리케이션 도메인에 속한다. 이것들을 feature module로 묶는 것이 make sense하다. 

- cats/cats.module.ts

    ```typescript
    import { Module } from '@nestjs/common';
    import { CatsController } from './cats.controller';
    import { CatsService } from './cats.service';

    @Module({
      controllers: [CatsController],
      providers: [CatsService],
    })
    export class CatsModule {}
    ```
    
- app.module.ts

    ```typescript  
    import { Module } from '@nestjs/common';
    import { CatsModule } from './cats/cats.module';

    @Module({
      imports: [CatsModule],
    })
    export class AppModule {}
    ```
    
## Shared Modules


![](https://i.imgur.com/yl0ZzsF.png)

- Nest에서 **모듈은 singleton**이 디폴트이다. 따라서, 프로퍼티의 같은 인스턴스를 여러 모듈 사이에서 공유할 수 있다.
- 모든 모듈이 자동으로 shared module이 된다. 

예를 들어, CatsService 인스턴스를 공유하고자 한다면, CatsService provider를 모듈의 **exports** 배열에 추가한다.

CatsService를 사용하고자 하는 모듈이 CatsModule를 import한다면, 이 provider에 접근할 수 있게 되며, 같은 인스턴스를 공유하게 된다.

- cats.module.ts
    ```typescript
    import { Module } from '@nestjs/common';
    import { CatsController } from './cats.controller';
    import { CatsService } from './cats.service';

    @Module({
      controllers: [CatsController],
      providers: [CatsService],
      exports: [CatsService]
    })
    export class CatsModule {}
    ```
    
## Global Module

Nest는 provider를 module scope 안으로 감싼다. 따라서 모듈의 provider를 사용하려면import 해야 한다. 

만약, 어디서든 사용해야 하는 provider가 있다면, 그 모듈을 전역으로 만들어야 한다. 
모듈을 전역으로 만들게 해주는 데코레이터는 `@Global()`이다. 

Global Module로 만들만한 모듈은 db connection, helper 정도이다.

```typescript
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```