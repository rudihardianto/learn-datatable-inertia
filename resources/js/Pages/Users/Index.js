import React, { useCallback, useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { debounce, pickBy } from 'lodash';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {
  const { data: people, meta, filtered, attributes } = props.users;
  const [pageNumber, setPageNumber] = useState([]);
  const [params, setParams] = useState(filtered);
  const reload = useCallback(
    debounce((query) => {
      Inertia.get(
        route('users.index'),
        { ...pickBy(query), page: query.search ? 1 : query.page },
        {
          preserveState: true,
          preserveScroll: true,
        }
      );
    }, 150),
    []
  );
  useEffect(() => reload(params), [params]);
  useEffect(() => {
    let numbers = [];
    for (let i = attributes.per_page; i <= attributes.total / attributes.per_page; i = i + attributes.per_page) {
      numbers.push(i);
    }
    setPageNumber(numbers);
  }, []);

  const onChange = (e) => setParams({ ...params, [e.target.name]: e.target.value });
  const sort = (item) => {
    setParams({
      ...params,
      field: item,
      direction: params.direction == 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <Authenticated auth={props.auth} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}>
      <Head title="Users" />

      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-end">
            <div className="w-1/2 mb-5">
              <div className="flex items-center justify-end gap-x-2 mb-3">
                {/* START: Select Form */}
                <select
                  name="load"
                  id="load"
                  onChange={onChange}
                  value={params.load}
                  className="form-select rounded-lg border-gray-300 focus:ring-blue-300 focus:ring transition duration-150 ease-in"
                >
                  {pageNumber.map((page, index) => (
                    <option key={index}>{page}</option>
                  ))}
                </select>
                {/* END: Select Form */}

                {/* START: Search */}
                <div className="flex items-center gap-x-2 rounded-lg border-gray-300 focus-within:ring-blue-300 focus-within:ring border focus-within:border-blue-400 bg-white px-2 transition duration-150 ease-in">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="form-text w-full border-0 focus:ring-0"
                    placeholder="Search for anything..."
                    type="text"
                    name="search"
                    id="search"
                    onChange={onChange}
                    value={params.search}
                  />
                </div>
                {/* END: Search */}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {/* No */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>

                        {/* Username */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="cursor-pointer flex items-center gap-x-2" onClick={() => sort('username')}>
                            Username
                            {params.direction == 'asc' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>

                        {/* Name */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="cursor-pointer flex items-center gap-x-2" onClick={() => sort('name')}>
                            Name
                            {params.direction == 'asc' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>

                        {/* Email */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="cursor-pointer flex items-center gap-x-2" onClick={() => sort('email')}>
                            Email
                            {params.direction == 'asc' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>

                        {/* Joined */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="cursor-pointer flex items-center gap-x-2" onClick={() => sort('created_at')}>
                            Joined
                            {params.direction == 'asc' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                        </th>

                        {/* Action */}
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>

                    {/* START: Query Data */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {people.map((person, index) => (
                        <tr key={person.email}>
                          <td className="px-6 py-4 whitespace-nowrap">{meta.from + index}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{person.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{person.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{person.created_at}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Action</td>
                        </tr>
                      ))}
                    </tbody>
                    {/* END: Query Data */}
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* START: Pagination */}
          <ul className="flex items-center gap-x-1 mt-5 justify-center">
            {meta.links.map((item, index) => (
              <button
                key={index}
                disabled={item.url == null ? true : false}
                className={`${
                  (item.url == null ? 'text-gray-400 cursor-default' : 'text-gray-800 ', item.active == true ? 'bg-gray-300 border-gray-500' : '')
                } w-12 h-9 rounded-lg flex items-center justify-center border bg-white`}
                onClick={() => setParams({ ...params, page: new URL(item.url).searchParams.get('page') })}
              >
                {item.label}
              </button>
            ))}
          </ul>
          {/* END: Pagination */}
        </div>
      </div>
    </Authenticated>
  );
}
