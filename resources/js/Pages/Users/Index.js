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
      Inertia.get(route('users.index'), pickBy(query), {
        preserveState: true,
      });
    }, 150),
    []
  );
  useEffect(() => reload(params), [params]);
  useEffect(() => {
    let numbers = [];
    for (let i = attributes.per_page; i <= meta.total / attributes.per_page; i = i + attributes.per_page) {
      numbers.push(i);
    }
    setPageNumber(numbers);
  }, []);

  const onChange = (e) => setParams({ ...params, [e.target.name]: e.target.value });

  return (
    <Authenticated auth={props.auth} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}>
      <Head title="Users" />

      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* START: Select Form */}
          <div className="flex items-center justify-end">
            <div className="w-auto mb-5">
              <select name="load" id="load" onChange={onChange} value={params.load} className="form-select rounded-lg">
                {pageNumber.map((page, index) => (
                  <option key={index}>{page}</option>
                ))}
              </select>
            </div>
          </div>
          {/* END: Select Form */}
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Username
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
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
                  </table>
                </div>
              </div>
            </div>
          </div>

          <ul className="flex items-center gap-x-1 mt-5 justify-center">
            {meta.links.map((item, index) => (
              <Link
                disabled={item.url == null ? true : false}
                as="button"
                className={`${
                  (item.url == null ? 'text-gray-400 cursor-default' : 'text-gray-800 ', item.active == true ? 'bg-gray-300 border-gray-500' : '')
                } w-12 h-9 rounded-lg flex items-center justify-center border bg-white`}
                href={item.url || ''}
                dangerouslySetInnerHTML={{ __html: item.label }}
              />
            ))}
          </ul>
        </div>
      </div>
    </Authenticated>
  );
}
