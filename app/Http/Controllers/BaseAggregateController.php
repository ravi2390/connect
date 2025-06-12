<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class BaseAggregateController extends Controller
{
    protected $returnCollection = false;

    /**
     * @var array of included relations
     */
    protected $withRelations = [];

    /**
     * @var string base class of response
     */
    protected $class = '';

    /**
     * AbstractCrudController constructor.
     */
    public function __construct(protected Request $request)
    {
    }

    public function __invoke($id = null)
    {
        $this->request->query->set('include', implode(',', $this->withRelations));
        $data = $this->getData($id);

        if ($this->returnCollection) {
            return $this->class::collection($data);
        }

        return new $this->class($data);
    }

    abstract protected function getData($id);
}
