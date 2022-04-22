<template>
  <div>
    <h2>对象的类型——接口</h2>
    <p>
      在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
    </p>
    <p>
      TypeScript
      中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
    </p>
    <h3>简单的例子</h3>
    <p>interface Person {</p>
    <p>name: string;</p>
    <p>age: number;</p>
    <p>}</p>
    <p>let tom: Person = {</p>
    <p>name:'Tom',</p>
    <p>age: 25 }</p>
    <p>定义的变量比接口少了一些属性是不允许的：</p>
    <p>多一些属性也是不允许的：</p>
    <h3>可选属性</h3>
    <p>有时我们希望不要完全匹配一个形状，那么可以用可选属性：</p>
    <p>interface Person {</p>
    <p>name: string;</p>
    <p>age?: number;</p>
    <p>}</p>
    <p>let tom: Person = {</p>
    <p>name: 'Tom'</p>
    <p>};</p>
    <h3>任意属性</h3>
    <p>有时候我们希望一个接口允许有任意的属性，可以使用如下方式：</p>
    <p>interface Person {</p>
    <p>name: string;</p>
    <p>age?: number;</p>
    <p>[propName: string]: any;</p>
    <p></p>
    <p>}</p>
    <p>let tom: Person = {</p>
    <p>name: 'Tom',</p>
    <p>gender: 'male'</p>
    <p>};</p>
    <p>
      需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
    </p>
    <h3>只读属性</h3>
    <p>
      有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly
      定义只读属性：
    </p>
    <h2>TypeScript 中类的用法</h2>
    <p>
      TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是
      public、private 和 protected。
    </p>
    <p>
      public
      修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是
      public 的
    </p>
    <p>private 修饰的属性或方法是私有的，不能在声明它的类的外部访问</p>
    <p>
      protected 修饰的属性或方法是受保护的，它和 private
      类似，区别是它在子类中也是允许被访问的
    </p>
    <p>class Animal {</p>
    <p>public name;</p>
    <p>public constructor(name) {</p>
    <p>this.name = name;</p>
    <p>}</p>
    <p>}</p>

    <p>let a = new Animal('Jack');</p>
    <p>console.log(a.name); // Jack</p>
    <p>a.name = 'Tom';</p>
    <p>console.log(a.name); // Tom</p>
    <p>
      上面的例子中，name 被设置为了 public，所以直接访问实例的 name
      属性是允许的。 很多时候，我们希望有的属性是无法直接存取的，这时候就可以用
      private 了：
    </p>
    <p>而如果是用 protected 修饰，则允许在子类中访问：</p>
    <p>当构造函数修饰为 private 时，该类不允许被继承或者实例化：</p>
    <p>当构造函数修饰为 protected 时，该类只允许被继承：</p>
    <p>只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。</p>
    <p>注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。</p>
    <p>类的类型</p>
    <p>给类加上 TypeScript 的类型很简单，与接口类似：</p>
    <p>class Animal {</p>
    <p></p>
    <p>name: string;</p>
    <p>constructor(name: string) {</p>
    <p>this.name = name;</p>
    <p>}</p>
    <p>sayHi(): string {</p>
    <p>return `My name is ${this.name}`;</p>
    <p>}</p>
    <p>}</p>

    <p>let a: Animal = new Animal('Jack');</p>
    <p>console.log(a.sayHi()); // My name is Jack</p>
  </div>
</template>