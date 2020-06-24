// Type definitions for express-restify-mongoose 3.2.0
// Project: https://github.com/florianholzapfel/express-restify-mongoose
// Definitions by: pedroraft <https://github.com/pedroraft> & ravishivt <https://github.com/ravishivt>
// Definitions: https://github.com/florianholzapfel/express-restify-mongoose
// TypeScript Version: 2.5.3

///<reference types="express" />
///<reference types="mongoose" />

// DOCS: https://florianholzapfel.github.io/express-restify-mongoose/
declare module 'express-restify-mongoose' {
  import * as express from 'express'
  import * as mongoose from 'mongoose'

  type Visibility = 'private' | 'protected' | 'public'

  export interface Options {
    /**
     * Path to prefix to the REST endpoint.
     *
     * Default: `/api`
     */
    prefix?: string
    /**
     * API version that will be prefixed to the rest path. If prefix or version contains `/:id`, then that will be used as the location to search for the id.
     *
     * Default:`/v1`
     * ### Example:
     *
     * ```
     * version: '/v1/Entities/:id'
     * ```
     *
     * Generates `/api/v1/Entities/:id/Model` and `/api/v1/Entities/Model` for all pertinent methods.
     *
     */
    version?: string
    /**
     * `findById` will query on the given property.
     *
     * Default: `_id`
     */
    idProperty?: string
    /**
     * Enable support for [restify](https://www.npmjs.com/package/restify) instead of [express](https://www.npmjs.com/package/express).
     *
     * Default: `false`
     */
    restify?: boolean
    /**
     * Endpoint name
     *
     * Default to the model name
     */
    name?: string
    /**
     * Whether or not regular expressions should be executed. Setting it to `true` will protect against ReDoS, see [issue #195](https://github.com/florianholzapfel/express-restify-mongoose/issues/195) for details.
     *
     * Default: `true`
     */
    allowRegex?: string
    /**
     * Whether or not mongoose should run schema validators when using `findOneAndUpdate`. For more information, [read the mongoose docs](http://mongoosejs.com/docs/validation.html#update-validators).
     *
     * Default: `false`
     */
    runValidators?: boolean
    /**
     * Determines the MongoDB nodes from which to read. For more information, [read the mongoose docs](http://mongoosejs.com/docs/api.html#query_Query-read).
     *
     * Default: `primary`
     */
    readPreference?: string
    /**
     * When `totalCountHeader: true`, execute a count query on `GET /Model` requests ignoring limit and skip and setting the result in the a response header. It can also be set to a string to allow for a custom header. This is useful when it’s necessary to know in advance how many matching documents exist.
     *
     * default: `false`
     * ### Example
     * #### Boolean
     * ```
     * totalCountHeader: true
     * ```
     * Response:
     * ```
     * Headers: {
     *   'X-Total-Count': 5
     * }
     * ```
     * #### String
     * ```
     * totalCountHeader: 'X-Custom-Count-Header'
     * ```
     * Response:
     * ```
     * Headers: {
     *   X-Custom-Count-Header': 5
     * }
     * ```
     */
    totalCountHeader?: boolean | string
    /**
     * Array of fields which are only to be returned by queries that have `private` access.
     * ### Example
     * #### Defined in options
     * ```
     * private: ['topSecret', 'fields']
     * ```
     * #### Defined in mongoose schema
     * ```
     * new Schema({
     *   topSecret: { type: String, access: 'private' },
     *   fields: { type: String, access: 'private' }
     * })
     * ```
     */
    private?: string[]
    /**
     * Array of fields which are only to be returned by queries that have `private` or `protected` access.
     * ### Example
     * #### Defined in options
     * ```
     * protected: ['somewhatSecret', 'keys']
     * ```
     * #### Defined in mongoose schema
     * ```
     * new Schema({
     *   somewhatSecret: { type: String, access: 'protected' },
     *   keys: { type: String, access: 'protected' }
     * })
     * ```
     */
    protected?: string[]
    /**
     * Whether or not mongoose should use `.lean()` to convert results to plain old JavaScript objects. This is bad for performance, but allows returning virtuals, getters and setters.
     *
     * Default: `true`
     */
    lean?: boolean
    /**
     * Whether to use `.findOneAndUpdate()` or `.findById()` and then `.save()`, allowing document middleware to be called. For more information regarding mongoose middleware, [read the docs](http://mongoosejs.com/docs/middleware.html).
     *
     * Default: `true`
     */
    findOneAndUpdate?: boolean
    /**
     * Whether to use `.findOneAndRemove()` or `.findById()` and then `.save()`, allowing document middleware to be called. For more information regarding mongoose middleware, [read the docs](http://mongoosejs.com/docs/middleware.html).
     *
     * * Default: `true`
     */
    findOneAndRemove?: boolean
    /**
     * Middleware that runs before preCreate, preRead, preUpdate and preDelete.
     */
    preMiddleware?: (req: express.Request, res: express.Response, next: express.NextFunction) => void
    /**
     * Middleware that runs before creating a resource.
     */
    preCreate?: (req: express.Request, res: express.Response, next: express.NextFunction) => void
    /**
     * Middleware that runs before reading a resource.
     */
    preRead?: (req: express.Request, res: express.Response, next: express.NextFunction) => void
    /**
     * Middleware that runs before updating a resource.
     *
     * When `findOneAndUpdate: false`, the document is available which is useful for authorization as well as setting values.
     */
    preUpdate?: (req: express.Request, res: express.Response, next: express.NextFunction) => void
    /**
     * Middleware that runs before deleting a resource.
     *
     * When `findOneAndRemove: false`, the document is available which is useful for authorization as well as performing non-destructive removals.
     */
    preDelete?: (req: express.Request, res: express.Response, next: express.NextFunction) => void
    /**
     * Returns or yields `private`, `protected` or `public`. It is called on GET, POST and PUT requests and filters out the fields defined in private and protected.
     */
    access?: (req: express.Request, done: (err?: Error, visibility?: Visibility) => void) => Visibility | void
    /**
     * Allows request specific filtering.
     */
    contextFilter?: (model: mongoose.Model<mongoose.Document>, req: express.Request, done: (param: any) => void) => void
    /**
     * Middleware that runs after successfully creating a resource. The unfiltered document is available on `req.erm.result`.
     */
    postCreate?: (req: express.Request, res: express.Response, next: express.NextFunction) => void
    /**
     * Middleware that runs after successfully reading a resource. The unfiltered document(s), or object(s) when `lean: false`, is available on `req.erm.result`.
     */
    postRead?: (req: express.Request, res: express.Response, next: express.NextFunction) => void
    /**
     * Middleware that runs after successfully updating a resource. The unfiltered document or objectwhen `lean: false`, is available on `req.erm.result`.
     */
    postUpdate?: (req: express.Request, res: express.Response, next: express.NextFunction) => void
    /**
     * Middleware that runs after successfully deleting a resource.
     */
    postDelete?: (req: express.Request, res: express.Response, next: express.NextFunction) => void
    /**
     * Function used to output the result. The filtered object is available on `req.erm.result`. Using the async version allows handling errors through onError.
     */
    outputFn?: (req: express.Request, res: express.Response) => void
    /**
     * Middleware that is called after output, useful for logging. The filtered object is available on `req.erm.result`.
     * > Not guaranteed to execute after output if async operations are performed inside outputFn
     */
    postProcess?: (req: express.Request, res: express.Response) => void
    /**
     * > Leaving this as default may leak information about your database
     *
     * Function used to output an error.
     */
    onError?: (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => void
  }

  /**
   * Serve an API for a Mongoose model
   */
  export function serve(router: express.Router, mongooseModel: mongoose.Model<mongoose.Document>, options?: Options): string

  /**
   * Sets the options as the default options for anything served afterwards
   */
  export function defaults(options: Options): void
}
